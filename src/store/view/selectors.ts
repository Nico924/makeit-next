import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string =>
  state.view && state.view.list

export default {
  getList,
};
