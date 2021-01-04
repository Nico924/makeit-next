import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string =>
  state.job && state.job.list

export default {
  getList,
};
