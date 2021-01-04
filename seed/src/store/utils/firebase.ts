import { put, call, select } from 'redux-saga/effects';
import app from 'store/app';
import content from 'store/content';

import { config } from 'config/general';
import authActions from 'store/auth/actions';

import { getContent } from './helper';

const fire =
  config.firebase && __BROWSER__ && window.firebase
    ? window.firebase.initializeApp(config.firebase)
    : null;

function funcCall(func): Promise | null {
  if (func) {
    return func
      .then(
        (success): any => ({ success }),
        (error): any => ({ error }),
      )
      .catch((error): any => ({ error }));
  }
  return null;
}

function* handleError(e): void {
  const appContent = yield select(content.selectors.getContent);
  const lg = yield select(content.selectors.getLanguage);
  // try get content
  const text = getContent(appContent, `${config.errorsPath}.${e.code}`, lg);

  console.log('text error', text);
  yield put(app.actions.dialog.error.action({ data: text || e.message || e }));
}

function* handleSuccess(e): void {
  const appContent = yield select(content.selectors.getContent);
  const lg = yield select(content.selectors.getLanguage);

  // try get content
  const text = getContent(appContent, `${config.successPath}.${e.code}`, lg);
  yield put(app.actions.dialog.success.action({ data: text || e.message || e }));
}

function* firebaseCall(options): any {
  if (!options.noLoading) {
    yield put(app.actions.loader.show.action());
  }

  fire.auth().useDeviceLanguage();

  const request = yield call(funcCall, options.action);

  if (!options.noLoading) {
    yield put(app.actions.loader.hide.action());
  }

  if (!request) return false;

  // error
  if (request.error) {
    console.log(request.error);

    if (options.callbackOnError) {
      yield call(options.callbackOnError, request.error);
    }
    yield call(handleError, request.error);

    if (options.actionRes) {
      yield put(options.actionRes(request.error, 'rejected'));
    }
  }

  // success
  if (!request.error) {
    // display success message
    if (options.success) {
      yield call(handleSuccess, options.success);
    }
    if (options.actionRes) {
      yield put(options.actionRes(request.success, 'fulfilled'));
    }
  }

  // callback afther
  if (options && options.callback && !request.error) {
    yield call(options.callback, request.success || request.error);
  }

  return request;
}

export function* refreshIdToken(): void {
  if (!fire) return;

  // here you must be sure that fire has been initialized
  const user = fire.auth().currentUser;

  if (!user) {
    return;
  }

  yield firebaseCall({
    action: user.getIdToken(),
    noLoading: true,
    // Store the new token in the state
    actionRes: authActions.firebase.refreshIdToken.result.action,
  });
}

// Wrapper function to wait firebase  to be initialized
function onAuthStateChanged(): Promise {
  if (!fire) return false;
  // no need to reject
  const checkFirebaseAuth = new Promise((resolve): void => {
    fire.auth().onAuthStateChanged((user): void => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
  return checkFirebaseAuth.then((user): any => user);
}

export { fire, onAuthStateChanged, firebaseCall };
