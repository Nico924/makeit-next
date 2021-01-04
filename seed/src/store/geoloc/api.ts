import { call, crud } from 'store/utils/api';
import { config } from 'config/general';

const api = {
  ...crud('geoloc'),
};

export default api;
