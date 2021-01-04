import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string =>
  state.invest && state.invest.list

export default {
  getList,
};
