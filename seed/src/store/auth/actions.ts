import { createActionStructure, createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  login: createAsyncStructure(`${constants.prefix}_SESSION_LOGIN`),
  logout: createAsyncStructure(`${constants.prefix}_SESSION_LOGOUT`),
  refresh: createAsyncStructure(`${constants.prefix}_TOKEN_REFRESH`),
  resetPassword: createAsyncStructure(`${constants.prefix}_PASSWORD_RESET`),
  changePassword: createAsyncStructure(`${constants.prefix}_change_password`),
  // Other auth actions
  loginSocial: createAsyncStructure(`${constants.prefix}_LOGIN_SOCIAL`),
  registerSocial: createAsyncStructure(`${constants.prefix}_REGISTER_SOCIAL`),
  // Firabase
  firebase: {
    login: createAsyncStructure(`${constants.firebasePrefix}_CONNECT`),
    logout: createAsyncStructure(`${constants.firebasePrefix}_LOGOUT`),
    signup: createAsyncStructure(`${constants.firebasePrefix}_SIGNUP`),
    setPasswordFromEmail: createAsyncStructure(
      `${constants.firebasePrefix}_SET_PASSWORD_WITH_EMAIL`,
    ),
    sendEmailResetPassword: createAsyncStructure(
      `${constants.firebasePrefix}_SEND_RECOVER_PASSWORD_EMAIL`,
    ),
    refreshIdToken: createAsyncStructure(`${constants.firebasePrefix}_REFRESH_ID_TOKEN`),
    setRefreshToken: createActionStructure(`${constants.firebasePrefix}_ADD_REFRESH_TOKEN`),
    reauthenticate: createAsyncStructure(`${constants.firebasePrefix}_REAUTHENTICATE`),
    changePassword: createAsyncStructure(`${constants.firebasePrefix}_CHANGE_PASSWORD`),
    changeEmail: createAsyncStructure(`${constants.firebasePrefix}_CHANGE_EMAIL`),
    sendEmailVerification: createAsyncStructure(
      `${constants.firebasePrefix}_SEND_EMAIL_VERIFICATION`,
    ),
  },
};

export default actions;
