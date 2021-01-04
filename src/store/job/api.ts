import { call, crud } from 'store/utils/api';
import { config } from 'config/general';

const api = {
  getAll: (options: Record<string, any>): Promise => call('public/jobs', 'GET', options),
  getById: (options: Record<string, any>): Promise =>
    call(`public/jobs/${options.url}/byUrl`, 'GET', options),
  related: (options: Record<string, any>): Promise =>
    call(`public/jobs/${options.id}/related`, 'GET', options),
};

export default api;
