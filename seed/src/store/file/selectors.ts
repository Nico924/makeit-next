import { StoreState } from 'store/rootReducer';

const getList = (state: StoreState): string => state.file && state.file.list;

export default {
  getList,
};
