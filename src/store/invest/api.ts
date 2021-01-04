import { call, crud } from 'store/utils/api';
import { config } from 'config/general';

const api = {
  profile: (options: Record<string, any>): void => call('crm/getCode', 'POST', options),
};

export default api;
