import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apolloCall } from 'store/utils/sagas';

import { config } from 'config/general';

import gql from 'graphql-tag';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import app from 'store/app';
import actions from './actions';
import selectors from './selectors';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri: config.api.uploadUrlApollo || config.api.baseUrlApollo || '',
    fetch,
  }),
  cache,
});

function* uploadFile(action) {
  const payload = (action && action.payload) || {};
  const mutate = gql`
    mutation upload($data: NewFileInput!) {
      uploadFile(input: $data) {
        _id
        title
        fileType
        large
        medium
        small
      }
    }
  `;

  yield call(apolloCall, {
    mutate,
    objectReturn: 'uploadFile',
    client,
    variables: {
      data: payload.data,
    },
    callback: payload.callback,
    progress: payload.progress,
    noLoading: payload.noLoading,
    loaderInfo: { upload: true },
    noAppHeaders: true,
  });
}

function* loadListFile() {
  const query = gql`
    {
      myFiles(pagination: { limit: 100, skip: 0 }) {
        _id
        title
        fileType
        large
        medium
        small
      }
    }
  `;

  yield call(apolloCall, {
    query,
    objectReturn: 'myFiles',
    actionRes: actions.list.result.action,
    noLoading: true,
    client,
    noAppHeaders: true,
  });
}

function* fileWatchers() {
  yield all([
    takeEvery(actions.list.request.constant, loadListFile),
    takeEvery(actions.upload.request.constant, uploadFile),
  ]);
}

export default function* saga() {
  yield call(fileWatchers);
}
