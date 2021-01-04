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

interface ArticleState {
  articles: {} | null;
  categories: {} | null;
  recent: {} | null;
  detail: {} | null;
  related: {} | null;
}

export const initialState: ArticleState = {
  articles: null,
  categories: null,
  recent: null,
  detail: null,
  related: null,
};

const reducer = (state: ArticleState = initialState, action: StoreAction): ArticleState => {
  return produce(
    state,
    (draft): ArticleState => {
      switch (action.type) {
        case actions.getArticles.request.constant:
          handleRequest(draft, action, 'articles');
          break;
        case actions.getArticles.result.constant:
          handleResponse(draft, action, 'articles');
          break;
        case actions.getCategories.request.constant:
          handleRequest(draft, action, 'categories');
          break;
        case actions.getCategories.result.constant:
          handleResponse(draft, action, 'categories');
          break;
        case actions.getRecentArticles.request.constant:
          handleRequest(draft, action, 'recent');
          break;
        case actions.getRecentArticles.result.constant:
          handleResponse(draft, action, 'recent');
          break;
        case actions.getOneArticle.request.constant:
          handleRequest(draft, action, 'detail');
          break;
        case actions.getOneArticle.result.constant:
          handleResponse(draft, action, 'detail');
          break;
        case actions.getRelatedArticles.request.constant:
          handleRequest(draft, action, 'related');
          break;
        case actions.getRelatedArticles.result.constant:
          handleResponse(draft, action, 'related');
          break;
        case actions.resetBlog.constant:
          draft.list = null;
          draft.categories = null;
          draft.recent = null;
          draft.articles = null;
          break;
        default:
      }
    },
  );
};

export default reducer;
