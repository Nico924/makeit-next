import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string =>
  state.newsletter && state.newsletter.list

export default {
  getList,
};
