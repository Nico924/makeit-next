import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { apolloCall } from 'store/utils/sagas';
import uniqid from 'uniqid';
import contentSelectors from 'store/content/selectors';

import { zeus } from 'config/general';

import gql from 'graphql-tag';

import actions from './actions';
import selectors from './selectors';

const { Zeus, $ } = zeus;

function* getAutocompletePlaces(action): void {
  const { payload } = action;

  const lg = yield select(contentSelectors.getLanguage);

  let zeusQuery;

  console.log('ACTION', action);

  try {
    zeusQuery = Zeus.query({
      placesAutocomplete: [
        {
          session: $`session`,
          input: $`input`,
          language: $`language`,
          // country: $`country`,
        },
        {},
      ],
    });
  } catch (error) {
    console.log('ERRROR GRAPHQL', error);
    return;
  }

  const query = gql`
    ${zeusQuery}
  `;

  let sessionId = yield select(selectors.getSessionId);

  if (!sessionId) {
    sessionId = uniqid();
    yield put(actions.setSessionId.action(sessionId));
  }

  yield call(apolloCall, {
    query,
    objectReturn: 'placesAutocomplete',
    actionRes: actions.getAutocomplete.result.action,
    data: {
      session: sessionId,
      input: payload.input,
      language: lg,
      // country: payload.country || [{ BE: true }],
    },
    callback: payload.callback,
    noLoading: true,
    callbackError: payload.callbackError,
  });
}

/**
 * get place's geolocalisation
 */
function* getGeoLoc(action): void {
  const { payload } = action;
  let sessionId = yield select(selectors.getSessionId);
  let zeusQuery;

  if (!sessionId) sessionId = uniqid();

  try {
    zeusQuery = Zeus.query({
      placesGeocode: [
        {
          session: $`session`,
          placeId: $`placeId`,
        },
        {},
      ],
    });
  } catch (error) {
    console.log('ERRROR GRAPHQL', error);
    return;
  }

  const query = gql`
    ${zeusQuery}
  `;

  yield call(apolloCall, {
    query,
    objectReturn: 'placesGeocode',
    actionRes: actions.getGeoLoc.result.action,
    data: {
      session: sessionId,
      placeId: payload.placeId,
    },
    callback: payload.callback,
    noLoading: true,
    callbackError: payload.callbackError,
  });

  // reset sessionId
  yield put(actions.setSessionId.action(null));

  // reset autocomplete places
  if (payload.resetList) yield put(actions.resetAutoComplete.action());
}

function* geolocWatchers() {
  yield all([
    yield takeLatest(actions.getAutocomplete.request.constant, getAutocompletePlaces),
    yield takeLatest(actions.getGeoLoc.request.constant, getGeoLoc),
  ]);
}

export default function* saga() {
  yield call(geolocWatchers);
}
