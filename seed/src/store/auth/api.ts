import { call } from 'store/utils/api';

const api = {
  login: (options: {}): Promise => call('auth/generate', 'POST', options),
  logout: (options: {}): Promise => call('auth/revoke', 'POST', options),
  refresh: (options: {}): Promise => call('auth/refresh', 'POST', options),
  resetPassword: (options: {}): Promise => call('password/reset', 'POST', options),
  changePassword: (options: {}): Promise => call('password/change', 'POST', options),
};

export default api;
