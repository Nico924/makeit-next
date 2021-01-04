import { call } from 'store/utils/api';

const api = {
  contentProd: (options: {}): Promise => call('admin/content', 'GET', options),
  contentDev: (options: {}): Promise => call('admin/content', 'GET', options),
};

export default api;
