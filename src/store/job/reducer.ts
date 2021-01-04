import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import { handleRequest, handleResponse } from 'store/utils/reducers';
import auth from 'store/auth';
import actions from './actions';

interface JobState {
  list: Record<string, any> | null;
  item: Record<string, any> | null;
  related: Record<string, any> | null;
}

export const initialState: JobState = {
  list: {},
  item: {},
  related: {},
};

const treatList = (item): Record<string, any> => {
  const newItem = { ...item };

  return newItem;
};

const reducer = (state: JobState = initialState, action: StoreAction): JobState => {
  return produce(
    state,
    (draft): JobState => {
      switch (action.type) {
        case actions.getAll.request.constant:
          handleRequest(draft, action, 'list', true);
          break;
        case actions.getAll.result.constant:
          handleResponse(draft, action, 'list', treatList);
          break;
        case actions.getById.request.constant:
          handleRequest(draft, action, 'item');
          break;
        case actions.getById.result.constant:
          handleResponse(draft, action, 'item');
          break;
        case actions.related.request.constant:
          handleRequest(draft, action, 'related');
          break;
        case actions.related.result.constant:
          handleResponse(draft, action, 'related');
          break;
        case auth.actions.logout.result.constant:
          draft = initialState;
          break;
        default:
      }
    },
  );
};

export default reducer;
