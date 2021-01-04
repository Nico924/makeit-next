import { put, takeLatest, all, call } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apiCall } from 'store/utils/sagas';

import { config } from 'config/general';

import actions from './actions';

function* newsletterSubscribe(action: StoreAction): void {
  yield apiCall({
    api: api.newsletter.subscribe,
    data: { ...action.payload.data, type: 'blog' },
    actionRes: actions.subscribe.result.action,
    callback: action.payload.callback,
  });
}

function* contactMessage(action: StoreAction): void {
  yield apiCall({
    api: api.newsletter.contact,
    data: action.payload.data || action.payload,
    actionRes: actions.contact.result.action,
    callback: action.payload.callback,
  });
}

function* newsletterWatchers(): void {
  yield all([
    yield takeLatest(actions.subscribe.request.constant, newsletterSubscribe),
    yield takeLatest(actions.contact.request.constant, contactMessage),
  ]);
}
export default function* saga(): void {
  yield call(newsletterWatchers);
}
