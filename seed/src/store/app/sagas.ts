import { take, select, put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import { channel, delay } from 'redux-saga';
import { api } from 'store/apis';
// Apis from parent
// Action type
import { StoreAction } from 'store/utils/actions';

import { content } from 'config/content';
import { config } from 'config/general';

import { apiCall } from 'store/utils/sagas';
import get from 'lodash/get';
import actions from './actions';
import selectors from './selectors';

export const externalChannel = channel();

export function* externalWatcher(): void {
  // for external dependencies
  while (true) {
    const action = yield take(externalChannel);
    yield put(action);
  }
}

function* displaySuccess(action: StoreAction): void {
  const { payload } = action;

  yield put(
    actions.dialog.show.action({
      id: 'success',
      title:
        config.successTitle || payload?.title || (content.modal && content.modal.defaultSuccess),
      messages: payload && payload.data,
    }),
  );

  if (!payload || !payload.noAutoClose) {
    yield call(delay, config.timeoutModal || 5000);
    yield put(actions.dialog.hide.action('success'));
  }
}

function* displayErrors(action: StoreAction): void {
  const { payload } = action;

  const messages = payload && payload.data;

  if (!messages) return;

  yield put(
    actions.dialog.show.action({
      id: 'error',
      title: config.errorTitle || (content.modal && content.modal.defaultError),
      messages,
      ...payload,
    }),
  );

  if (!payload || !payload.noAutoClose) {
    yield call(delay, config.timeoutModal || 5000);
    yield put(actions.dialog.hide.action('error'));
  }
}

function* loaderReset(action): void {
  // 30 seconds for upload etc, ...
  let timer;
  if (action.payload && action.payload.upload) timer = 60000;
  yield call(delay, timer || config.timeoutLoader || 30000);
  const loader = yield select(selectors.getLoader);
  if (loader.active) yield put(actions.loader.reset.action());
}

/* convert b64 sring to file */
function* b64ToFile(action: StoreAction): void {
  const payload = action && action.payload;

  if (!payload && !payload.data) return false;

  const url = payload.url;
  const filename = payload.fileName;
  const mimeType = payload.mimeType;

  function urlToFile(fileUrl) {
    return fetch(fileUrl)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }));
  }

  const file = yield call(urlToFile, url);

  const callback = payload.callback;
  callback(file);

  return false;
}

export function* uploadFile(action): void {
  const payload = action.payload || {};

  const uploadPath = payload.uploadUrl || payload.api;

  let apiFunc = api.app.uploadFile;
  if (uploadPath) apiFunc = get(api, uploadPath) || apiFunc;

  const apiData = payload.file
    ? {
        file: payload.file,
      }
    : payload.data;

  yield call(apiCall, {
    api: apiFunc,
    data: apiData,
    fileName: payload.fileName,
    fileUpload: true,
    success: payload.success,
    progress: payload.progress,
    callback: payload.callback,
    callbackError: payload.callbackError,
    noLoading: payload.noLoading,
    actionRes: actions.uploadFile.result.action,
  });
}
export function* uploadImage(action): void {
  const payload = action.payload || {};

  const uploadPath = payload.uploadUrl || payload.api;

  let apiFunc = api.app.uploadImage;
  if (uploadPath) apiFunc = get(api, uploadPath) || apiFunc;

  const apiData = payload.file
    ? {
        file: payload.file,
      }
    : payload.data;

  yield call(apiCall, {
    api: apiFunc,
    data: apiData,
    fileName: payload.fileName,
    fileUpload: true,
    success: payload.success,
    progress: payload.progress,
    callback: payload.callback,
    callbackError: payload.callbackError,
    noLoading: payload.noLoading,
    actionRes: actions.uploadImage.result.action,
  });
}

function* appWatchers(): void {
  yield all([
    yield takeLatest(actions.loader.show.constant, loaderReset),
    yield takeLatest(actions.dialog.error.constant, displayErrors),
    yield takeLatest(actions.dialog.success.constant, displaySuccess),
    yield takeLatest(actions.b64ToFile.constant, b64ToFile),
    yield takeEvery(actions.uploadFile.request.constant, uploadFile),
    yield takeEvery(actions.uploadImage.request.constant, uploadImage),
  ]);
}

export default function* saga(): void {
  yield call(appWatchers);
}
