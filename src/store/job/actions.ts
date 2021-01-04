import { createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  getAll: createAsyncStructure(`${constants.prefix}_get_all_job`),
  getById: createAsyncStructure(`${constants.prefix}_get_by_id_job`),
  related: createAsyncStructure(`${constants.prefix}_related_job`),
};

export default actions;
