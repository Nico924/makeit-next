import { StoreState } from 'store/rootReducer';

const getLoader = (state: StoreState): {} => (state.app.loader ? state.app.loader : false);

const getHeader = (state: StoreState): string => state.app && state.app.headers;

export default { getLoader, getHeader };
