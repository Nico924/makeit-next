import { createActionStructure, createAsyncStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  toggleHeader: createActionStructure(`${constants.prefix}_toggleHeader`),
  homeMounted: createActionStructure(`${constants.prefix}_homeMounted`),
  mobile: createActionStructure(`${constants.prefix}_mobile`),
  fakeLoading: createActionStructure(`${constants.prefix}_fakeLoading`),
  hideFooterCta: createActionStructure(`${constants.prefix}_hideFooterCta`),
  headerBlog: createActionStructure(`${constants.prefix}_headerBlog`),
  hideHeader: createActionStructure(`${constants.prefix}_hide_header`),
  stickyHeader: createActionStructure(`${constants.prefix}_sticky_header`),
  message: createAsyncStructure(`${constants.prefix}_message`),
};

export default actions;
