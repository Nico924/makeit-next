import { put, takeLatest, all, call } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apiCall } from 'store/utils/sagas';

import { config } from 'config/general';

import actions from './actions';
import selectors from './selectors';

function* userMessage(action: StoreAction): void {
  yield apiCall({
    baseUrl: 'https://lwk5ppjwbk.execute-api.us-west-1.amazonaws.com/production/s-1/',
    api: api.view.message,
    data:
      (action.payload.data && {
        ...action.payload.data,
        campaign: 'makeit-investinideas',
      }) ||
      action.payload,
    callback: action.payload.callback,
    success: action.payload.success,
    actionRes: actions.message.result.action,
  });
}

function* viewWatchers(): void {
  yield all([yield takeLatest(actions.message.request.constant, userMessage)]);
}

export default function* saga(): void {
  yield call(viewWatchers);
}
