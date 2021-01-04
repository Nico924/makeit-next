import { call, select, put, takeLatest, takeEvery } from 'redux-saga/effects';
import get from 'lodash/get';
import moment from 'moment';

import { content } from 'config/content';
import { config, zeus } from 'config/general';

import client from 'store/rootApollo';
import app from 'store/app';

import { refreshToken } from 'store/auth/sagas';

import contentSelectors from 'store/content/selectors';
import authSelectors from 'store/auth/selectors';
import appSelectors from 'store/app/selectors';

import { refreshIdToken } from 'store/utils/firebase';

import { handleApolloError, getErrorMessage } from './errors';
import { getContent } from './helper';

const { AllTypesProps } = zeus;

function apolloDataTreatment(model, data) {
  const simpleType = ['String', 'enum', 'DateTime', 'Float', 'Boolean', 'Int', 'ID'];

  const result = {};
  const keys = Object.keys(data);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = data[key];
    const modelType = model[key];

    if (!value && (!modelType || (modelType && !modelType.required))) {
      continue;
    } else if (!value && modelType.required) {
      if (modelType.type === 'Boolean') {
        result[key] = value;
      } else {
        console.warn(key, 'is required in model', model);
        continue;
      }
    }

    if (modelType) {
      if (simpleType.includes(modelType.type)) {
        result[key] = value;
      } else if (simpleType.includes(AllTypesProps[modelType.type])) {
        result[key] = value;
      } else if (modelType.array) {
        result[key] = [];
        value?.forEach(el => {
          const elem = apolloDataTreatment(AllTypesProps[modelType.type], el);
          result[key].push(elem);
        });
      } else {
        result[key] = apolloDataTreatment(AllTypesProps[modelType.type], value);
      }
    }
  }

  return result;
}

export function* apolloCall(options) {
  if (!options.noLoading) {
    yield put(app.actions.loader.show.action(options.loaderInfo || null));
  }

  let session = yield select(authSelectors.getSession);

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

  const context = {};
  context.headers = options.headers || {};

  if (session && !options.noToken) {
    options.token = session.token || session.idToken;

    const tokenType = session.token_type || session.type;

    context.headers.Authorization = tokenType
      ? `${tokenType} ${options.token}`
      : `${options.token}`;
  }

  if (appSelectors && appSelectors.getHeader && !options.noAppHeaders) {
    const headers = yield select(appSelectors.getHeader);

    if (headers) context.headers = { ...context.headers, ...headers };
  }

  function graphQLQuery(query) {
    let apolloClient;
    if (options.client) apolloClient = options.client;
    else apolloClient = client.getInstance();

    return apolloClient
      .query({
        query,
        variables: options.variables || options.data,
        context,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      })
      .then(res => res)
      .catch(handleApolloError);
  }

  if (options && options.mutate && options.inputModel) {
    options.data[options.inputName || 'input'] = apolloDataTreatment(
      AllTypesProps[options.inputModel],
      options.data[options.inputName || 'input'],
    );
  }

  function graphQLMutate(mutate) {
    let apolloClient;
    if (options.client) apolloClient = options.client;
    else apolloClient = client.getInstance();
    // return Promise.resolve(
    return apolloClient
      .mutate({
        mutation: mutate,
        variables: options.variables || options.data,
        context,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      })
      .then(res => res)
      .catch(handleApolloError);
  }

  const requestData = options.variables || options.data || {};
  let response;

  if (options.query) {
    // Do not remove, it helps for debug
    console.log('graph call', 'QUERY', options.name || options.objectReturn);
    response = yield call(graphQLQuery, options.query);
  }

  if (options.mutate || options.mutation) {
    // Do not remove, it helps for debug
    console.log('graph call', 'MUTATE', options.name || options.objectReturn);
    response = yield call(graphQLMutate, options.mutate || options.mutation);
  }

  if (!options.noLoading) {
    yield put(app.actions.loader.hide.action());
  }

  // Error handling
  if (!response.data) {
    if (typeof options.callbackError === 'function') {
      yield call(options.callbackError, response);
    }
    if (options.actionFailure) {
      yield put(options.actionFailure(response, 'rejected', requestData));
    }
    if (options.actionRes) {
      yield put(options.actionRes(response, 'rejected', requestData));
    }

    let errorData;
    if (response.errors && response.errors.length > 0) {
      errorData = [];
      for (let index = 0; index < response.errors.length; index++) {
        const element = response.errors[index];
        if (element.data && element.data.errorInfo) {
          errorData.push(element.data.errorInfo);
        } else {
          errorData.push(element);
        }
      }
    } else errorData = content.general.messages.defaultError;

    if (options.treatError && typeof options.treatError === 'function') {
      errorData = options.treatError(errorData);
    }

    const language = yield select(contentSelectors.getLanguage);
    const appContent = yield select(contentSelectors.getContent);

    let errorMessage = getErrorMessage(errorData[0], appContent, language, errorData);
    errorMessage = getContent(appContent, `${config.errorsPath}.${errorMessage}`, language);

    if (!options.noFeedback && __BROWSER__) {
      yield put(
        app.actions.dialog.error.action({
          data: errorMessage || errorData,
        }),
      );
    }
    return errorData;
  }

  const data = response.data;
  // Success handling
  if (data) {
    let result = (data && options.objectReturn && get(data, options.objectReturn)) || data;

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
      if (typeof options.success !== 'string') {
        yield put(
          app.actions.dialog.success.action({
            title: options.success?.title,
            data: options.success?.message || (data && data.message),
          }),
        );
      } else {
        yield put(
          app.actions.dialog.success.action({
            data: options.success || (data && data.message),
          }),
        );
      }
    }

    return result;
  }

  return response;
}

/**
 * Example usage
 *
 * action.payload = action.payload || {};
 * const payload = action.payload;
 *
 * const zeusQuery = Zeus.query({
 *    listSearchMany: models.listModel]
 * });
 *
 * payload.query = gql`
 *  ${zeusQuery}
 * `;
 *
 * yield call(genericApolloSaga('', actions.list.result.action), action);
 *
 */
export const genericApolloSaga = (objectReturn, actionRes) =>
  function*(action) {
    const payload = action.payload || {};

    yield call(apolloCall, {
      ...payload,
      objectReturn,
      query: payload.query,
      mutate: payload.mutation,
      data: payload.data,
      noLoading: payload.noLoading,
      noFeedback: payload.noFeedback,
      success: payload.success,
      callback: payload.callback,
      callbackError: payload.callbackError,
      actionRes,
    });
  };
