/*
Seed saga import the sagas from the parent app and add the following two
- app :  handles success/errors
- externalWatchers : a watcher to put events into
*/
import { fork } from 'redux-saga/effects';
import sagas from 'store/appSaga';
import auth from './auth';
import app from './app';
import content from './content';
import { externalWatcher } from './app/sagas';
import file from './file';
import geoloc from './geoloc';

export default function* rootSaga(): void {
  // project sagas
  yield fork(sagas);
  yield fork(content.saga);
  yield fork(auth.saga);
  yield fork(app.saga);
  yield fork(file.saga);
  yield fork(geoloc.saga);
  yield fork(externalWatcher);
}
