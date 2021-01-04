import { eventChannel } from 'redux-saga';
import { put, takeEvery, all, call, select } from 'redux-saga/effects';
// from the parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apiCall, apolloCall, genericSaga } from 'store/utils/sagas';
import { firebaseCall, fire } from 'store/utils/firebase';

import { zeus, config } from 'config/general';
import app from 'store/app';

import gql from 'graphql-tag';

import actions from './actions';
import selectors from './selectors';

function* handleError(e: string | {}): void {
  yield put(app.actions.dialog.error.action({ data: e.message || e }));
}

export function getAuthChannel(): any {
  const authChannel = eventChannel((emit): void => {
    const unsubscribe = fire.auth().onAuthStateChanged((user): void => emit({ user }));
    return unsubscribe;
  });
  return authChannel;
}

/**
 * Internal auth handling
 */

function* login(action: StoreAction): void {
  const payload = action.payload || {};

  if (config.loginApollo) {
    const { Zeus, $ } = zeus;

    const apiInput = {
      creds: $`creds`,
    };

    const outputModel = {
      localId: true,
      email: true,
      displayName: true,
      idToken: true,
      registered: true,
      refreshToken: true,
      expiresIn: true,
    };

    const queryObj = {
      [config.loginQueryName]: [apiInput, outputModel],
    };

    const zeusQuery = Zeus.query(queryObj);

    const query = gql`
      ${zeusQuery}
    `;

    yield call(apolloCall, {
      query,
      noToken: true,
      objectReturn: config.loginQueryName,
      variables: {
        creds: payload.data,
      },
      noLoading: payload.noLoading,
      noFeedback: payload.noFeedback,
      success: payload.success,
      callback: payload.callback,
      callbackError: payload.callbackError,
      actionRes: actions.login.result.action,
    });
    return;
  }

  yield call(apiCall, {
    api: api.session.login,
    data: payload.data || payload,
    success: payload.success,
    callback: payload.callback,
    addLanguage: true,
    noLoading: payload.noLoading,
    actionRes: actions.login.result.action,
    noFeedback: payload.noFeedback,
  });
}

function* logout(action: StoreAction): void {
  const payload = action.payload || {};

  if (config.loginApollo) {
    // sanawar+project@makeit-studio.com
    yield put(actions.logout.result.action());
    if (payload.callback) payload.callback();
    return;
  }

  yield call(apiCall, {
    api: api.session.logout,
    data: payload.data || payload,
    callback: payload.callback,
    noFeedback: true,
    noLoading: payload.noLoading,
    actionRes: actions.logout.result.action,
  });

  yield put(app.actions.setHeaders.action(null));
}

function* changePassword(action: StoreAction): void {
  const payload = action.payload || {};

  if (config.loginApollo) {
    const { Zeus, $ } = zeus;

    const apiInput = {
      input: $`input`,
    };

    const outputModel = {
      _id: true,
    };

    const mutationObj = {
      [config.updatePasswordMutationName]: [apiInput, outputModel],
    };

    const zeusMutation = Zeus.mutation(mutationObj);

    const mutate = gql`
      ${zeusMutation}
    `;

    yield call(apolloCall, {
      mutate,
      // noToken: true,
      objectReturn: config.updatePasswordMutationName,
      variables: {
        input: payload.data,
      },
      noLoading: payload.noLoading,
      actionRes: actions.changePassword.result.action,
      noFeedback: payload.noFeedback,
      success: payload.success,
      addLanguage: true,
    });

    return;
  }

  yield call(apiCall, {
    api: api.session.changePassword,
    data: payload.data || payload,
    success: payload.success,
    callback: payload.callback,
    noFeedback: payload.noFeedback,
    noLoading: payload.noLoading,
    actionRes: actions.changePassword.result.action,
  });
}

function* resetPassword(action: StoreAction): void {
  const payload = action.payload || {};

  if (config.loginApollo) {
    const { Zeus, $ } = zeus;

    const apiInput = {
      input: $`input`,
    };

    const outputModel = {
      message: true,
    };

    const mutationObj = {
      [config.resetPasswordMutationName]: [apiInput, outputModel],
    };

    const zeusMutation = Zeus.mutation(mutationObj);

    const mutate = gql`
      ${zeusMutation}
    `;

    yield call(apolloCall, {
      mutate,
      // noToken: true,
      objectReturn: config.resetPasswordMutationName,
      variables: {
        input: payload.data,
      },
      callback: payload.callback,
      noLoading: payload.noLoading,
      actionRes: actions.resetPassword.result.action,
      noFeedback: payload.noFeedback,
      success: payload.success,
      addLanguage: true,
    });

    return;
  }

  yield call(apiCall, {
    api: api.session.resetPassword,
    data: payload.data || payload,
    success: payload.success,
    callback: payload.callback,
    addLanguage: true,
    noFeedback: payload.noFeedback,
    noLoading: payload.noLoading,
    actionRes: actions.resetPassword.result.action,
  });
}

export function* refreshToken(action: StoreAction): void {
  const payload = (action && action.payload) || {};

  if (config.loginApollo) {
    const { Zeus, $ } = zeus;

    const session = yield select(selectors.getSession);

    if (!session.refreshToken) {
      return;
    }

    const apiInput = {
      refreshToken: session.refreshToken,
    };

    const outputModel = {
      localId: true,
      email: true,
      displayName: true,
      idToken: true,
      registered: true,
      refreshToken: true,
      expiresIn: true,
    };

    const queryObj = {
      [config.loginQueryName]: [apiInput, outputModel],
    };

    const zeusQuery = Zeus.query(queryObj);

    const query = gql`
      ${zeusQuery}
    `;

    yield call(apolloCall, {
      noToken: true,
      query,
      name: 'refreshToken',
      objectReturn: config.loginQueryName,
      noLoading: payload.noLoading,
      noFeedback: payload.noFeedback,
      success: payload.success,
      callback: payload.callback,
      callbackError: payload.callbackError,
      actionRes: actions.refresh.result.action,
    });

    return;
  }
  yield call(apiCall, {
    api: api.session.refresh,
    data: payload.data || payload,
    noFeedback: true,
    noLoading: payload.noLoading,
    actionRes: actions.refresh.result.action,
  });
}

/**
 * Firebase auth handling
 */
function* firebaseLogin(action: StoreAction): void {
  const payload = action.payload || {};

  if (!payload) {
    yield call(handleError, 'Missing payload to api call');
    return;
  }

  if (!payload.noLoading) yield put(app.actions.loader.show.action());

  const { data, callback, success } = payload;

  if (!data.email || !data.password) {
    yield call(handleError, 'Missing values password or email');
    return;
  }

  const firstRequest = yield firebaseCall({
    action: fire.auth().signInWithEmailAndPassword(data.email, data.password),
    success,
    noLoading: true,
    noFeedback: payload.noFeedback,
  });

  if (firstRequest && firstRequest.success) {
    yield firebaseCall({
      action: fire.auth().currentUser.getIdTokenResult(),
      actionRes: actions.firebase.login.result.action,
      callback,
      noLoading: true,
      noFeedback: payload.noFeedback,
    });
  } else {
    yield put(actions.firebase.login.result.action(null, 'rejected'));
  }
  if (!payload.noLoading) yield put(app.actions.loader.hide.action());
}

function* firebaseSignUp(action: StoreAction): void {
  const payload = action.payload || {};

  const { data, callback, success } = payload;

  if (!payload.noLoading) yield put(app.actions.loader.show.action());

  const request = yield firebaseCall({
    action: fire.auth().createUserWithEmailAndPassword(data.email, data.password),
    noLoading: true,
    success,
  });

  if (request && (request.success || !request.error)) {
    const secondRequest = yield firebaseCall({
      action: fire.auth().currentUser.getIdTokenResult(),
      noLoading: true,
      callback,
      actionRes: actions.firebase.login.result.action,
    });

    // Send confirmation email or not
    if (config.emailVerification && secondRequest && !secondRequest.error) {
      yield firebaseCall({
        action: fire.auth().currentUser.sendEmailVerification(),
        noLoading: true,
      });
    }
  }
  if (!payload.noLoading) yield put(app.actions.loader.hide.action());
}

function* firebaseSendEmailVerification(action: StoreAction): void {
  if (fire.auth().currentUser) {
    yield firebaseCall({
      action: fire.auth().currentUser.sendEmailVerification(),
      callback: action.payload && action.payload.callback,
      actionRes: actions.firebase.sendEmailVerification.result.action,
      success: action.payload && action.payload.success,
    });
  }
}

export function* firebaseLogout(action: StoreAction): void {
  const payload = action.payload;

  yield firebaseCall({
    ...payload,
    action: fire.auth().signOut(),
    actionRes: actions.logout.result.action,
  });

  yield put(app.actions.setHeaders.action(null));
}

export function* refreshIdToken(): void {
  // here you must be sure that fire has been initialized
  const user = fire.auth().currentUser;

  if (!user) {
    return;
  }

  yield firebaseCall({
    action: user.getIdToken(),
    noLoading: true,
    // Store the new token in the state
    actionRes: actions.firebase.refreshIdToken.result.action,
  });
}

function* setPasswordFromEmail(action: StoreAction): void {
  const payload = action.payload;

  if (!payload) {
    yield call(handleError, 'Missing payload to api call');
    return;
  }

  if (!payload.code) {
    yield call(handleError, 'Missing validation code in URL');
    return;
  }

  const verifyRequest = yield firebaseCall({
    noLoading: payload.noLoading,
    action: fire.auth().verifyPasswordResetCode(payload.code),
    callbackOnError: payload.callback,
  });

  if (verifyRequest.success) {
    yield firebaseCall({
      ...payload,
      action: fire.auth().confirmPasswordReset(payload.code, payload.data.password),
      callback: payload.callback,
      success: payload.success,
      actionRes: actions.firebase.setPasswordFromEmail.result.action,
    });
  }
}

function* sendEmailResetPassword(action: StoreAction): void {
  const payload = action.payload;

  if (!payload) {
    yield call(handleError, 'Missing payload to api call');
    return;
  }

  yield firebaseCall({
    ...payload,
    action: fire.auth().sendPasswordResetEmail(payload.data.email),
    callback: payload.callback,
    actionRes: actions.firebase.sendEmailResetPassword.result.action,
  });
}

function* reauthenticateWithCredential(action: StoreAction): any {
  const payload = action.payload;

  if (!payload || !payload.password) {
    yield call(handleError, 'Missing payload to api call');
    return false;
  }

  const user = fire.auth().currentUser;

  const firebase = window.firebase;

  if (!firebase) return false;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, payload.password);

  if (cred) {
    const req = yield firebaseCall({
      action: user.reauthenticateWithCredential(cred),
      callback: payload.callback,
    });

    return req;
  }
  return false;
}

function* firebaseChangePassword(action: StoreAction): void {
  const user = fire.auth().currentUser;
  const data = action.payload.data || action.payload;

  if (!data || !data.password || !data.currentPassword) {
    yield call(handleError, 'Missing payload to api call');
    return;
  }

  const payload = {
    password: data.currentPassword,
    callback: action.payload.callback,
  };

  const reauth = yield call(reauthenticateWithCredential, { payload });

  if (reauth && !reauth.error) {
    yield firebaseCall({
      action: user.updatePassword(data.password),
      callback: payload.callback,
      success: data.success || 'Your password has been correctly updated',
    });
  }
}

function* firebaseChangeEmail(action: StoreAction): void {
  const user = fire.auth().currentUser;
  const data = action.payload.data || action.payload;

  if (!data || !data.email || !data.currentEmail) {
    yield call(handleError, 'Missing payload to api call');
    return;
  }

  const payload = {
    password: data.password,
    callback: action.payload.callback,
  };

  const reauth = yield call(reauthenticateWithCredential, { payload });

  if (reauth && !reauth.error) {
    yield firebaseCall({
      action: user.updateEmail(data.email),
      callback: action.payload && action.payload.callback,
      success: data.success || 'Your email has been correctly updated',
    });
  }
}

function* authWatchers(): void {
  yield all([
    // normal
    yield takeEvery(actions.login.request.constant, login),
    yield takeEvery(actions.logout.request.constant, logout),
    yield takeEvery(actions.changePassword.request.constant, changePassword),
    yield takeEvery(actions.resetPassword.request.constant, resetPassword),
    yield takeEvery(actions.refresh.request.constant, refreshToken),
    // Social
    yield takeEvery(
      actions.loginSocial.request.constant,
      genericSaga('session.loginSocial', actions.loginSocial.result.action),
    ),
    yield takeEvery(
      actions.registerSocial.request.constant,
      genericSaga('session.registerSocial', actions.registerSocial.result.action),
    ),

    // firebase
    yield takeEvery(actions.firebase.login.request.constant, firebaseLogin),
    yield takeEvery(actions.firebase.logout.request.constant, firebaseLogout),
    yield takeEvery(actions.firebase.signup.request.constant, firebaseSignUp),
    yield takeEvery(actions.firebase.refreshIdToken.request.constant, refreshIdToken),
    yield takeEvery(actions.firebase.setPasswordFromEmail.request.constant, setPasswordFromEmail),
    yield takeEvery(
      actions.firebase.sendEmailResetPassword.request.constant,
      sendEmailResetPassword,
    ),
    yield takeEvery(actions.firebase.reauthenticate.request.constant, reauthenticateWithCredential),
    yield takeEvery(actions.firebase.changePassword.request.constant, firebaseChangePassword),
    yield takeEvery(actions.firebase.changeEmail.request.constant, firebaseChangeEmail),
    yield takeEvery(
      actions.firebase.sendEmailVerification.request.constant,
      firebaseSendEmailVerification,
    ),
  ]);
}

export default function* saga(): void {
  yield call(authWatchers);
}
