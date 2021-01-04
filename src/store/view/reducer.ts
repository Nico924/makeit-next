import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import { handleRequest, handleResponse } from 'store/utils/reducers';
import auth from 'store/auth';
import actions from './actions';

interface ViewState {
  loading: Record<string, any> | null;
  header: boolean;
  // Reduce size of header container on Blog part
  smallHeader: boolean;
  homeIsMount: boolean;
  mobile: boolean;
  noFooterCta: boolean;
}

export const initialState: ViewState = {
  loading: false,
  header: false,
  homeIsMount: false,
  mobile: false,
  noFooterCta: false,
  smallHeader: false,
  hideHeader: true,
  stickyHeader: false,
};

const reducer = (state: ViewState = initialState, action: StoreAction): ViewState =>
  produce(
    state,
    (draft): ViewState => {
      switch (action.type) {
        case actions.fakeLoading.constant:
          draft.loading = action.payload;
          break;
        case actions.homeMounted.constant:
          draft.homeIsMount = action.payload;
          break;
        case actions.toggleHeader.constant:
          draft.header = action.payload;
          break;
        case actions.mobile.constant:
          draft.mobile = action.payload;
          break;
        case actions.hideFooterCta.constant:
          draft.noFooterCta = action.payload;
          break;
        case actions.headerBlog.constant:
          draft.smallHeader = action.payload;
          break;
        case actions.hideHeader.constant:
          draft.hideHeader = action.payload;
          break;
        case actions.stickyHeader.constant:
          draft.stickyHeader = action.payload;
          break;
        default:
      }
    },
  );

export default reducer;
