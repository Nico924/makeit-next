import { createActionStructure, createAsyncStructure } from 'store/utils/actions';

import { action } from '@storybook/addon-actions';
import constants from './constants';

const actions = {
  bootup: createAsyncStructure(`${constants.prefix}_bootup`),
  mobile: createActionStructure(`${constants.prefix}_mobile`),
  tablet: createActionStructure(`${constants.prefix}_tablet`),
  dialog: {
    show: createActionStructure(`${constants.prefix}_DIALOG_SHOW`),
    hide: createActionStructure(`${constants.prefix}_DIALOG_HIDE`),
    error: createActionStructure(`${constants.prefix}_DIALOG_ERROR`),
    success: createActionStructure(`${constants.prefix}_DIALOG_SUCCESS`),
    hideAll: createActionStructure(`${constants.prefix}_DIALOG_HIDE_ALL`),
  },
  loader: {
    show: createActionStructure(`${constants.prefix}_LOADER_SHOW`),
    hide: createActionStructure(`${constants.prefix}_LOADER_HIDE`),
    reset: createActionStructure(`${constants.prefix}_LOADED_RESET`),
  },
  sideMenu: {
    show: createActionStructure(`${constants.prefix}_SIDE_MENU_SHOW`),
    hide: createActionStructure(`${constants.prefix}_SIDE_MENU_HIDE`),
  },
  b64ToFile: createActionStructure(`${constants.prefix}_B64_TO_FILE`),
  uploadFile: createAsyncStructure(`${constants.prefix}_upload_file`),
  uploadImage: createAsyncStructure(`${constants.prefix}_upload_image`),
  setHeaders: createActionStructure(`${constants.prefix}_SET_HEADERS`),
};

export default actions;
