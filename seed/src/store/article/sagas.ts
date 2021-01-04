import { put, takeEvery, all, call } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { genericCrudSagas, apiCall, apolloCall } from 'store/utils/sagas';

import { config, zeus } from 'config/general';
import gql from 'graphql-tag';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import uniq from 'lodash/uniq';

import actions from './actions';
import selectors from './selectors';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({ uri: config.api.baseUrlBlog || config.api.baseUrlApollo || '', fetch }),
  cache,
});

const { Zeus, $ } = zeus;

const translatable = ['title', 'content', 'urls', 'description', 'keywords', 'teaser'];
const image = ['thumbnail', 'cover'];
const categories = ['title', 'colorCode', '_id'];
const author = ['firstName', 'lastName', '_id'];

function gqlConvertBlog(model) {
  const output = {};

  for (let index = 0; index < model.length; index++) {
    const element = model[index];
    output[element] = true;

    if (translatable.includes(element)) {
      output[element] = {};
      for (let i = 0; i < config.availableLanguages.length; i++) {
        const lg = config.availableLanguages[i];
        output[element][lg] = true;
      }
    }

    if (image.includes(element)) {
      output[element] = {
        large: true,
        medium: true,
        small: true,
      };
    }

    if (element === 'getCategories') {
      output[element] = gqlConvertBlog(categories);
    }

    if (element === 'getAuthor') {
      output[element] = gqlConvertBlog(author);
    }

    if (element === 'seo') {
      output[element] = gqlConvertBlog(['title', 'description', 'keywords', 'thumbnail']);
    }
  }

  return output;
}

const defaultOutPut = [
  '_id',
  'title',
  'urls',
  'teaser',
  'thumbnail',
  'getCategories',
  'getAuthor',
  'viewsCount',
  'publicationDate',
  'r',
];

const articleModel = [
  '_id',
  'content',
  'title',
  'teaser',
  'createdAt',
  'updatedAt',
  'getCategories',
  'getAuthor',
  'cover',
  'thumbnail',
  'seo',
  'urls',
  'published',
  'publicationDate',
  'viewsCount',
  'r',
];

export function* getArticles(action, actionRes) {
  const mergeOutPut = defaultOutPut.concat(
    (action && action.payload && action.payload.output) || [],
  );

  const output = gqlConvertBlog(uniq(mergeOutPut));

  const zeusQuery = Zeus.query({
    articlesGetMany: [(action && action.payload && action.payload.data) || {}, output],
  });

  const query = gql`
    ${zeusQuery}
  `;

  if (!actionRes) actionRes = actions.getArticles.result.action;

  yield call(apolloCall, {
    query,
    objectReturn: 'articlesGetMany',
    actionRes,
    noLoading: true,
    callback: action && action.payload && action.payload.callback,
    client,
  });
}

function* getPublicArticle(action) {
  yield call(getArticles, action, actions.getArticles.result.action);
}

export function* loadArticles(): void {
  yield call(getArticles);
}

export function* getArticleCategories(action) {
  const mergeOutPut = categories.concat((action && action.payload && action.payload.output) || []);

  const output = gqlConvertBlog(uniq(mergeOutPut));

  const data = (action && action.payload && action.payload.data) || {};

  const apiInput = {
    ressourceType: 'articles',
    ...data,
  };

  const zeusQuery = Zeus.query({
    categoriesGetMany: [apiInput, output],
  });

  const query = gql`
    ${zeusQuery}
  `;

  yield call(apolloCall, {
    query,
    objectReturn: 'categoriesGetMany',
    actionRes: actions.getCategories.result.action,
    noLoading: true,
    callback: action && action.payload && action.payload.callback,
    client,
  });
}

export function* getArticleRecent(action) {
  let pagination = {
    sort: 'publicationDate desc',
    skip: 0,
    limit: 3,
  };

  if (action.payload && action.payload.data && action.payload.data.pagination) {
    pagination = { ...pagination, ...action.payload.data.pagination };
  }

  action.payload = {
    data: {
      pagination,
    },
  };

  yield call(getArticles, action, actions.getRecentArticles.result.action);
}

export function* getRelatedArticles(action) {
  const rest = { ...action.payload.data };

  const pagination = {
    sort: 'publicationDate desc',
    skip: 0,
    limit: 3,
  };

  action.payload = {
    data: {
      pagination,
      ...rest,
    },
  };

  yield call(getArticles, action, actions.getRelatedArticles.result.action);
}

export function* getOneArticle(action) {
  const output = gqlConvertBlog(articleModel);

  const zeusQuery = Zeus.query({
    articlesGetOneByUrl: [
      {
        url: $`url`,
        language: $`lg`,
      },
      output,
    ],
  });

  const query = gql`
    ${zeusQuery}
  `;

  yield apolloCall({
    query,
    objectReturn: 'articlesGetOneByUrl',
    actionRes: actions.getOneArticle.result.action,
    data: (action && action.payload && action.payload.data) || {},
    noLoading: true,
    callback: action && action.payload && action.payload.callback,
    client,
  });
}

function* articleWatchers() {
  yield all([
    yield takeEvery(actions.getArticles.request.constant, getPublicArticle),
    yield takeEvery(actions.getCategories.request.constant, getArticleCategories),
    yield takeEvery(actions.getRecentArticles.request.constant, getArticleRecent),
    yield takeEvery(actions.getOneArticle.request.constant, getOneArticle),
    yield takeEvery(actions.getRelatedArticles.request.constant, getRelatedArticles),
  ]);
}

export default function* saga() {
  yield call(articleWatchers);
}
