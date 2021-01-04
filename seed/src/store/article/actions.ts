import { createAsyncStructure, createActionStructure } from 'store/utils/actions';

import constants from './constants';

const actions = {
  getArticles: createAsyncStructure(`${constants.prefix}_articles_get_public`),
  getCategories: createAsyncStructure(`${constants.prefix}_articles_categories`),
  getRecentArticles: createAsyncStructure(`${constants.prefix}_articles_get_recent`),
  getOneArticle: createAsyncStructure(`${constants.prefix}_articles_get_one`),
  getRelatedArticles: createAsyncStructure(`${constants.prefix}_articles_get_related`),

  resetBlog: createActionStructure(`${constants.prefix}_reset_articles`),
};

export default actions;
