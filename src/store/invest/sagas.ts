import { put, takeLatest, all, call } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apiCall } from 'store/utils/sagas';

import { config } from 'config/general';

import actions from './actions';
import selectors from './selectors';

function* investProfile(action): void {
  yield call(apiCall, {
    baseUrl: 'https://lwk5ppjwbk.execute-api.us-west-1.amazonaws.com/production/s-1/',
    api: api.invest.profile,
    data: action.payload.data,
    actionRes: actions.profile.result.action,
    callback: action.payload.callback,
  });
}

function* investWatchers(): void {
  yield all([yield takeLatest(actions.profile.request.constant, investProfile)]);
}

export default function* saga(): void {
  yield call(investWatchers);
}
