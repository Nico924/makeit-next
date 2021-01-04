import { createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  subscribe: createAsyncStructure(`${constants.prefix}_newsletter_subscribe`),
  contact: createAsyncStructure(`${constants.prefix}_newsletter_contact`),
};

export default actions;
