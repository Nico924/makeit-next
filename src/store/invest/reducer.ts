import { StoreAction } from "store/utils/actions";
import produce from "immer";
import { handleRequest, handleResponse } from "store/utils/reducers";
import auth from "store/auth";
import actions from "./actions";

interface InvestState {
  profile: Record<string, any> | null;
}

export const initialState: InvestState = {
  profile: {}
};

const reducer = (
  state: InvestState = initialState,
  action: StoreAction
): InvestState => {
  return produce(
    state,
    (draft): InvestState => {
      switch (action.type) {
        case actions.profile.request.constant:
          handleRequest(draft, action, "profile");
          break;
        case actions.profile.result.constant:
          handleResponse(draft, action, "profile");
          break;
        case auth.actions.logout.result.constant:
          draft = initialState;
          break;
        default:
      }
    }
  );
};

export default reducer;
