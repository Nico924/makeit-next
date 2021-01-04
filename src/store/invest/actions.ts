import { createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  profile: createAsyncStructure(`${constants.prefix}_invest_profile`),
};

export default actions;
