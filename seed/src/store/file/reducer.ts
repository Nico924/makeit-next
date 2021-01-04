import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import { handleRequest, handleResponse } from 'store/utils/reducers';
import auth from 'store/auth';
import actions from './actions';

interface FileState {
  list: {} | null;
}

export const initialState: FileState = {
  list: null,
};

const reducer = (state: FileState = initialState, action: StoreAction): FileState => {
  return produce(
    state,
    (draft): FileState => {
      switch (action.type) {
        case actions.list.request.constant:
          handleRequest(draft, action, 'list');
          break;
        case actions.list.result.constant:
          handleResponse(draft, action, 'list');
          break;
        case auth.actions.logout.result.constant:
          draft.list = null;
          draft.detail = null;
          break;
        default:
      }
    },
  );
};

export default reducer;
