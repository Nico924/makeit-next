import { call } from 'store/utils/api';

const api = {
  uploadFile: (options: {}): void => call('upload/file', 'POST', options),
  uploadImage: (options: {}): void => call('upload/image', 'POST', options),
};

export default api;
