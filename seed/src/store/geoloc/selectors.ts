import { StoreState } from 'store/rootReducer';

const getSessionId = (state: StoreState): string => state.geoloc && state.geoloc.sessionId;

export default {
  getSessionId,
};
