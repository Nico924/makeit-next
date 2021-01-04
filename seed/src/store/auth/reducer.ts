import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import Cookies from 'universal-cookie';
import { config } from 'config/general';
import actions from './actions';

interface AuthState {
  data: {} | null;
  loading: boolean;
}

export const initialState: AuthState = {
  data: null,
  loading: false,
};

const saveSession = (data: {}): void => {
  if (config.serverStorage && config.cookieStorage) return;

  if (!data) return;

  const cookies = new Cookies();
  let expiration = data && (data.expirationTime || data.exp_date);
  if (expiration) expiration = new Date(expiration);
  cookies.set(config.sessionCookie, data, { expires: expiration });
};

const removeSesssion = (): void => {
  if (config.serverStorage && config.cookieStorage) return;

  const cookies = new Cookies();
  cookies.remove(config.sessionCookie);
};

const reducer = (state: AuthState = initialState, action: StoreAction): AuthState =>
  produce(
    state,
    (draft): AuthState => {
      switch (action.type) {
        /**
         * Firebase
         */
        case actions.firebase.login.request.constant:
          draft.loading = true;
          break;
        case actions.firebase.login.result.constant:
          draft.loading = false;
          if (action.status === 'rejected') break;
          draft.data = {
            // used to check expiration
            creationDate: new Date().toISOString(),
            ...action.payload,
          };
          saveSession(draft.data);
          break;
        case actions.firebase.refreshIdToken.result.constant:
          if (action.status === 'rejected') break;
          if (draft.data) {
            draft.data.token = action.payload;
          }
          saveSession(draft.data);
          break;
        case actions.firebase.setRefreshToken.constant:
          if (draft.data) draft.data.refreshToken = action.payload;
          saveSession(draft.data);
          break;
        case actions.firebase.reauthenticate.result.constant:
          break;
        /**
         * Normal
         */
        case actions.login.request.constant:
          draft.loading = true;
          break;
        case actions.login.result.constant:
          draft.loading = false;
          if (action.status === 'rejected') break;
          draft.data = {
            // used to check expiration
            creationDate: new Date().toISOString(),
            ...action.payload,
          };
          saveSession(draft.data);
          break;
        case actions.loginSocial.result.constant:
          draft.loading = false;
          if (action.status === 'rejected') break;
          draft.data = {
            // used to check expiration
            creationDate: new Date().toISOString(),
            ...action.payload,
          };
          saveSession(draft.data);
          break;
        case actions.registerSocial.result.constant:
          draft.loading = false;
          if (action.status === 'rejected') break;
          draft.data = {
            // used to check expiration
            creationDate: new Date().toISOString(),
            ...action.payload,
          };
          saveSession(draft.data);
          break;
        case actions.logout.result.constant:
          draft.data = null;
          removeSesssion();
          break;
        case actions.refresh.result.constant:
          draft.data = {
            // used to check expiration
            creationDate: new Date().toISOString(),
            ...action.payload,
          };
          saveSession(draft.data);
          break;
        default:
      }
    },
  );

export default reducer;
