import { StoreState } from 'store/rootReducer';

const getSession = (state: StoreState): string =>
  state.session && state.session.data ? state.session.data : false;

export default {
  getSession,
};
