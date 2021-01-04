import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import find from 'lodash/find';
import auth from 'store/auth';
import actions from './actions';

interface AppState {
  isMobile?: boolean;
  isTablet?: boolean;
  ready: boolean;
  dialogs: {};
  load: {
    value: number;
    active: boolean;
  };
  sideMenus: {
    right: {};
    left: {};
  };
  headers: {};
}

export const initialState: AppState = {
  isMobile: false,
  ready: false,
  dialogs: {
    custom: {},
    preview: {},
    confirm: {},
    success: {},
    error: {},
  },
  loader: {
    value: 0,
    active: false,
  },
  sideMenus: {
    right: {},
    left: {},
  },
};
const reducer = (state: AppState = initialState, action: StoreAction): AppState => {
  // let index;
  let item;
  let dialogs;
  let dialogsName;

  return produce(
    state,
    (draft: AppState): AppState => {
      switch (action.type) {
        case actions.tablet.constant:
          draft.isTablet = action.payload;
          break;
        case actions.mobile.constant:
          draft.isMobile = action.payload;
          break;
        case actions.dialog.show.constant:
          item = action.payload;
          if (!item) return;
          item.active = true;
          item.unmount = true;
          draft.dialogs[item.id] = item;
          break;
        case actions.dialog.hide.constant:
          dialogs = draft.dialogs;
          item = find(dialogs, (it): boolean => it.id === action.payload);
          if (!item) return;
          item.active = false;
          break;
        case actions.dialog.hideAll.constant:
          dialogs = draft.dialogs;
          dialogsName = Object.keys(dialogs);
          // pass all active modal to false
          for (let i = 0; i < dialogsName.length; i++) {
            if (dialogs[dialogsName[i]] && dialogs[dialogsName[i]].active)
              dialogs[dialogsName[i]].active = false;
          }
          break;
        case actions.sideMenu.show.constant:
          item = action.payload;
          if (!item) return;
          item.active = true;
          draft.sideMenus[item.id] = item;
          break;
        case actions.sideMenu.hide.constant:
          item = find(draft.sideMenus, (it): boolean => it.id === action.payload);
          if (item) item.active = false;
          break;
        case actions.loader.show.constant:
          draft.loader.value += 1;
          draft.loader.active = draft.loader.value > 0;
          break;
        case actions.loader.hide.constant:
          draft.loader.value -= 1;
          if (draft.loader.value <= 0) {
            draft.loader.value = 0;
            draft.loader.active = false;
          }
          break;
        case actions.loader.reset.constant:
          draft.loader.value = 0;
          draft.loader.active = false;
          break;
        case actions.bootup.result.constant:
          draft.ready = true;
          break;
        case actions.setHeaders.constant:
          draft.headers = action.payload;
          break;
        case auth.actions.logout.result.constant:
          draft.headers = {};
          break;
        default:
      }
    },
  );
};

export default reducer;
