import { put, takeLatest, all, call } from 'redux-saga/effects';

// Apis from parent
import { api } from 'store/apis';
// Action type
import { StoreAction } from 'store/utils/actions';
import { apiCall } from 'store/utils/sagas';

import { config } from 'config/general';

import actions from './actions';
import selectors from './selectors';

function* jobList(action: StoreAction): void {
  yield apiCall({
    api: api.job.getAll,
    data: action.payload,
    actionRes: actions.getAll.result.action,
    noLoading: true,
  });
}

function* jobById(action: StoreAction): void {
  yield apiCall({
    api: api.job.getById,
    url: action.payload.data || action.payload,
    actionRes: actions.getById.result.action,
    callback: action.payload.callback,
  });
}

function* jobRelated(action: StoreAction): void {
  yield apiCall({
    api: api.job.related,
    id: action.payload,
    actionRes: actions.related.result.action,
  });
}

function* jobWatchers(): void {
  yield all([
    yield takeLatest(actions.getAll.request.constant, jobList),
    yield takeLatest(actions.getById.request.constant, jobById),
    yield takeLatest(actions.related.request.constant, jobRelated),
  ]);
}

export default function* saga(): void {
  yield call(jobWatchers);
}
