import { call, crud } from 'store/utils/api';
import { config } from 'config/general';

const api = {
  ...crud('article'),
};

export default api;
