import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import {
  handleRequest,
  handleResponse,
  handleUpdateResponse,
  handleAddResponse,
  handleDeleteResponse,
} from 'store/utils/reducers';
import auth from 'store/auth';
import actions from './actions';

interface GeolocState {
  list: {} | null;
  geoloc: {} | null;
  sessionId: string;
  selection: {} | null;
}

export const initialState: GeolocState = {
  list: null,
  geoloc: null,
  sessionId: null,
  selection: null,
};

const reducer = (state: GeolocState = initialState, action: StoreAction): GeolocState => {
  return produce(
    state,
    (draft): GeolocState => {
      switch (action.type) {
        case actions.getAutocomplete.request.constant:
          handleRequest(draft, action, 'list');
          break;
        case actions.getAutocomplete.result.constant:
          handleResponse(draft, action, 'list');
          break;
        case actions.getGeoLoc.request.constant:
          handleRequest(draft, action, 'geoloc');
          break;
        case actions.getGeoLoc.result.constant:
          handleResponse(draft, action, 'geoloc');
          break;
        case actions.setSessionId.constant:
          draft.sessionId = action.payload;
          break;
        case actions.resetAutoComplete.constant:
          draft.list = null;
          break;
        case auth.actions.logout.result.constant:
          draft.list = null;
          draft.geoloc = null;
          draft.selection = null;
          break;
        case actions.handleSelection.constant:
          draft.selection = action.payload;
          break;
        default:
      }
    },
  );
};

export default reducer;
