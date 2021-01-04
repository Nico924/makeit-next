import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string => state.article && state.article.list;

export default {
  getList,
};
