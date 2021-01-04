import { call, crud } from 'store/utils/api';
import { config } from 'config/general';
import newsletterApi from 'store/newsletter/api';
import jobApi from 'store/job/api';
import viewApi from 'store/view/api';
import investApi from 'store/invest/api';

export const api = {
  app: {
    contentProd: (options: Record<string, any>): Promise => call('admin/content', 'GET', options),
    contentDev: (options: Record<string, any>): Promise =>
      call('https://api.makeit-studio.com/admin/content', 'GET', { raw: true }),
  },
  // SESSION
  session: {
    login: (options: Record<string, any>): Promise => call('auth/generate', 'POST', options),
    logout: (options: Record<string, any>): Promise => call('auth/revoke', 'POST', options),
    resetPassword: (options: Record<string, any>): Promise =>
      call('/password/reset', 'POST', options),
  },
  // ACCOUNT
  account: {
    profile: (options: Record<string, any>): Promise => call('me', 'GET', options),
    updateProfile: (options: Record<string, any>): Promise => call('me', 'PUT', options),
    signup: (options: Record<string, any>): Promise => call('signup', 'GET', options),
  },
  newsletter: newsletterApi,
  job: jobApi,
  view: viewApi,
  invest: investApi,
};

export default api;
