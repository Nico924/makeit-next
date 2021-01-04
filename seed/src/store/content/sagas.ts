import { takeLatest, all, call, select } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { apiCall, apolloCall } from 'store/utils/sagas';
import { config } from 'config/general';

import gql from 'graphql-tag';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import actions from './actions';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri: config.api.baseUrlContent || config.api.baseUrlCMS || config.api.baseUrlApollo || '',
    fetch,
  }),
  cache,
});

export function* loadContent(): void {
  const lg = yield select(state => state.content.lg);

  if (config.cmsApollo) {
    const name = config.cmsQueryName;

    const query = gql`
      {
        ${name}(pagination: { skip: 0, limit: 1000  }) {
          _id
          title
          label
          content
          position
        }
      }
    `;

    yield call(apolloCall, {
      query,
      objectReturn: `${name}`,
      actionRes: actions.content.result.action,
      noLoading: true,
      noFeedback: true,
      noToken: !config.cmsToken,
      client,
    });
  } else {
    const apisList = api.content || api.app;

    const callAPI = config.prod ? apisList.contentProd : apisList.contentDev;

    yield call(apiCall, {
      lg: config.storeOnlyCurrentLanguage && lg,
      api: callAPI,
      actionRes: actions.content.result.action,
      noLoading: true,
      noFeedback: true,
      noToken: true,
    });
  }
}

function* contentWatchers(): void {
  yield all([yield takeLatest(actions.content.request.constant, loadContent)]);
}

export default function* saga(): void {
  yield call(contentWatchers);
}
