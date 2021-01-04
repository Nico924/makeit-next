import { createActionStructure, createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  content: createAsyncStructure(`${constants.prefix}_load`),
  language: {
    switch: createActionStructure(`${constants.prefix}_LANGUAGE_SWITCH`),
  },
};

export default actions;
