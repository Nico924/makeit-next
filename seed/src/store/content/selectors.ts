import { StoreState } from 'store/rootReducer';

const getLanguage = (state: StoreState): string => state.content && state.content.lg;

const getContent = state => state.content && state.content.raw;
export default {
  getLanguage,
  getContent,
};
