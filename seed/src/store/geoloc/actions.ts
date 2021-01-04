import { createActionStructure, createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  setSessionId: createActionStructure(`${constants.prefix}_set_session_id`),
  resetAutoComplete: createActionStructure(`${constants.prefix}_reset_autocomplete`),
  getAutocomplete: createAsyncStructure(`${constants.prefix}_autocomplete`),
  getGeoLoc: createAsyncStructure(`${constants.prefix}_get_geoLoc`),
  handleSelection: createActionStructure(`${constants.prefix}_handle_selection`),
};

export default actions;
