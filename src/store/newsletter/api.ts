import { call, crud } from 'store/utils/api';
import { config } from 'config/general';

const api = {
  subscribe: (options: Object): Promise => call('public/newsletter', 'POST', options),
  contact: (options: Object): Promise => call('forms/contact', 'POST', options),
};

export default api;
