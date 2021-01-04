import { call, select, put, takeLatest, takeEvery, take } from 'redux-saga/effects';

import app from 'store/app';

import { content } from 'config/content';
import { config } from 'config/general';

import authSelectors from 'store/auth/selectors';
import authActions from 'store/auth/actions';
import { refreshIdToken } from 'store/utils/firebase';

import contentSelectors from 'store/content/selectors';
import api from 'store/apis';
import get from 'lodash/get';
import moment from 'moment';
import { refreshToken } from 'store/auth/sagas';
import { extractErrorCode, extractErrorData, getErrorMessage } from './errors';

import { apolloCall, genericApolloSaga } from './apollo';

/**
 * @param {Object} options - Object
 * @param {string} options.id - ID of a specific resource used in by the api
 * @param {Function} options.progress - method for upload api while progression
 * @param {boolean} options.fileUpload - say if upload or not
 * @param {Promise} options.api - Promise (usually in apis.js of the parent) which is a rest api call
 * @param {boolean} options.noFeedback - tell if the api call should give to the use or not (errors, ...)
 * @param {boolean} options.addLanguage - tell if the api call should add language parameter
 * @param {boolean} options.noLoading - tell if the api call hide or not the loading
 * @param {Object} options.headers - custom headers for the api
 *
 * @param {Function} transform - transform function that treat data before calling the actionSuccess or action
 *
 * @param {Function} options.actionSuccess - redux action to dispatch if success
 * @param {Function} options.actionFailure - redux action to dispatch if failure
 * @param {Function} options.actionRes - redux action to dispatch after call
 *
 * @param {Function} options.callback - callback function that is call at the end of the api call
 *
 * @param {string} options.success - success message to give if api is a success
 */
function* apiCall(options: {}): any {
  if (!options || !options.api) {
    console.error('Wrong apiCall config!', options);
    return null;
  }

  if (!options.noLoading) {
    yield put(app.actions.loader.show.action());
  }

  let session = yield select(authSelectors.getSession);

  const language = yield select(contentSelectors.getLanguage);
  const appContent = yield select(contentSelectors.getContent);

  if (!options.noToken && session) {
    const now = moment();
    // Frontend Firebase
    if (config.firebase && session.expirationTime && moment(session.expirationTime).isBefore(now)) {
      yield call(refreshIdToken);
      session = yield select(authSelectors.getSession);
    }
    // BE refresh token
    else if (
      session.expiresIn &&
      session.creationDate &&
      session.refreshToken &&
      moment(session.creationDate)
        .add(session.expiresIn, 'seconds')
        .isBefore(now)
    ) {
      yield call(refreshToken);
      session = yield select(authSelectors.getSession);
    }
  }

  options.headers = options.headers || {};

  if (session && !options.noToken) {
    options.token = session.token || session.idToken;

    const tokenType = session.token_type || session.type;

    options.headers.Authorization = tokenType
      ? `${tokenType} ${options.token}`
      : `${options.token}`;
  }

  if (options.addLanguage) {
    options.data = options.data || {};
    options.data.language = language;
  }

  const requestData = options.data || options;

  const response = yield call(options.api, options);
  /* 
  console.info(
    'api response code',
    response ? response.status : 'no response',
    response ? response.config && response.config.url : '',
  ); */
  if (!options.noLoading) {
    yield put(app.actions.loader.hide.action());
  }

  const defaultError = content.general.messages.defaultError;

  if (!response) {
    if (!options.noFeedback) {
      yield put(
        app.actions.dialog.error.action({
          data: defaultError,
        }),
      );
    }
    if (options.actionRes) {
      yield put(options.actionRes(null, 'rejected'));
    }
    return null;
  }
  const data = response.data ? response.data : null;

  // Handling of errors
  function* handleError(apiData): string[] | string {
    const errorInfo = extractErrorData(apiData);

    if (typeof options.callbackError === 'function') {
      yield call(options.callbackError, apiData);
    }
    if (options.actionFailure) {
      yield put(options.actionFailure(apiData, 'rejected', requestData));
    }
    if (options.actionRes) {
      yield put(options.actionRes(apiData, 'rejected', requestData));
    }

    // stop auto handling of feedback
    if (options.noFeedback) return apiData;

    // Handle auto disconnection if the first error return an error code understood as a disconnect error
    if (!options.noDisconnect) {
      // Authentication error
      const disconnectedErrors = [
        ...config.disconnectedErrors,
        // FIREBASE ERRORS
        'auth/argument-error',
        // FIREBASE AUTH ERRORS
        // see https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
        'auth/invalid-user-token',
        'auth/user-token-expired',
        // APP ERRORS
        'firebaseError',
        'authentication',
        'invalid_token',
        'expired_token',
        'user_deleted',
        'revoked_token',
      ];

      let firstErrorCode;
      if (Array.isArray(errorInfo)) {
        firstErrorCode = extractErrorCode(errorInfo[0]);
      } else {
        firstErrorCode = extractErrorCode(errorInfo);
      }

      console.log('first error code', firstErrorCode);

      // Stop if disconnected error
      if (disconnectedErrors.indexOf(firstErrorCode) >= 0) {
        yield put(
          app.actions.dialog.error.action({
            data:
              config.authenticationError || (content.modal && content.modal.authenticationError),
          }),
        );

        yield put(authActions.logout.result.action());
        return apiData;
      }
    }

    // Handle the auto display of the error modal with the errors returned
    let errorData = errorInfo;

    // handle error directly
    if (Array.isArray(errorData)) {
      for (let i = 0; i < errorData.length; i++) {
        errorData[i].message = getErrorMessage(errorData[i], appContent, language, defaultError);
      }
    }
    // Case error is an Array of errors
    else {
      errorData = getErrorMessage(errorInfo, appContent, language, defaultError);
    }

    console.log('Treated error data', errorData);

    yield put(
      app.actions.dialog.error.action({
        data: errorData,
      }),
    );

    return apiData;
  }

  // unhautorized
  if (response.status === 401) {
    if (!options.noFeedback) {
      const errorData = extractErrorData(data);
      const message = getErrorMessage(errorData, appContent, language, defaultError);
      console.log('authorization error', message);
      yield put(
        app.actions.dialog.error.action({
          data: message,
        }),
      );
    }

    yield put(authActions.logout.result.action());

    return data;
  }
  if (response.status >= 400) {
    return yield call(handleError, data);
  }
  if (response.status >= 200 && response.status < 300) {
    // 200 error
    if (data && (data.success === false || data[config.defaultErrorsPath])) {
      return yield call(handleError, data);
    }

    let result = options.rawData
      ? data
      : (data && (data[config.defaultResponsePath] || data.result)) || data;

    // let result = (data && (data[config.defaultResponsePath] || data.result)) || data;
    if (options.actionSuccess) {
      result = options.transform ? options.transform(result) : result;
      yield put(options.actionSuccess(result, 'fulfilled', requestData));
    }
    if (options.actionRes) {
      result = options.transform ? options.transform(result) : result;
      yield put(options.actionRes(result, 'fulfilled', requestData));
    }

    if (typeof options.callback === 'function') {
      yield call(options.callback, result);
    }
    if (!options.noSuccess && !options.noFeedback && ((data && data.message) || options.success)) {
      yield put(
        app.actions.dialog.success.action({
          data: options.success || (data && data.message),
        }),
      );
    }
    return result;
  }

  return response;
}

/**
 * @param {string} resource - Path or resource name
 * @param {string|Function} actionName - second part of the path or action result
 * @param {Function?} actionRes - action result
 */
const genericSaga = (resource: string, actionName: string | Function, actionRes?: Function) =>
  function*(action) {
    const payload = action.payload || {};

    let actionResult = actionRes;

    let path = resource;
    if (typeof actionName === 'function') actionResult = actionName;
    else {
      path += `.${actionName}`;
    }

    return yield call(apiCall, {
      ...payload,
      api: get(api, path),
      addLanguage: payload.addLanguage,
      data: payload.data,
      noLoading: payload.noLoading,
      noFeedback: payload.noFeedback,
      success: payload.success,
      callback: payload.callback,
      callbackError: payload.callbackError,
      actionRes: actionResult,
    });
  };

/**
 *
 * @param action Generic action object with request and result
 * @param payload payload to send
 */
function* genericCall(action: object, payload) {
  yield put(action.request.action(payload));
  yield take(action.result.constant);
}

function* genericCrudSagas(actions, resource, latest) {
  const method = latest ? takeLatest : takeEvery;

  const sagas = [
    yield method(
      actions.list.request.constant,
      genericSaga(`${resource}.list`, actions.list.result.action),
    ),
    yield method(
      actions.listMore.request.constant,
      genericSaga(`${resource}.listMore`, actions.listMore.result.action),
    ),
    yield method(
      actions.detail.request.constant,
      genericSaga(`${resource}.detail`, actions.detail.result.action),
    ),
    yield method(
      actions.update.request.constant,
      genericSaga(`${resource}.update`, actions.update.result.action),
    ),
    yield method(
      actions.add.request.constant,
      genericSaga(`${resource}.add`, actions.add.result.action),
    ),
    yield method(
      actions.delete.request.constant,
      genericSaga(`${resource}.delete`, actions.delete.result.action),
    ),
  ];

  return sagas;
}

// REST APIs
export { apiCall, genericSaga, genericCrudSagas, genericCall };

// GraphQL APIs
export { apolloCall, genericApolloSaga };

// default
export default apiCall;
