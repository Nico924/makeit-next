import { createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  list: createAsyncStructure(`${constants.prefix}_list`),
  upload: createAsyncStructure(`${constants.prefix}_upload`),
};

export default actions;
