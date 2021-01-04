import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { select as sagaSelect } from 'redux-saga/effects';

import { apiCall } from 'store/utils/sagas';
import app from 'store/app';
import { accountActions } from 'store/account/actions';

import auth from 'store/auth';

const fakeApi = () => {};

const actionResult = accountActions.profileResult;

const apiConfig = {
  api: fakeApi,
  noLoading: false,
  noFeedback: false,
  success: 'Dumb success',
  callback: () => {},
  actionRes: actionResult,
  actionSuccess: actionResult,
  actionFailure: actionResult,
};

const apiSucces = {
  status: 200,
  data: {
    success: true,
    result: {
      data: 'hello',
    },
  },
};

const apiError = {
  status: 200,
  data: {
    success: false,
    errors: [
      {
        messsage: 'Hello',
      },
    ],
  },
};

const apiFail = null;

it(
  'Test api (success)',
  () =>
    expectSaga(apiCall, apiConfig)
      .provide([
        // Use the `select` effect creator from Redux Saga to match
        [sagaSelect(auth.selectors.getSession), null],
        // Use the `call.fn` matcher from Redux Saga Test Plan
        [matchers.call.fn(fakeApi), apiSucces],
      ])
      .put(app.actions.loader.show.action())
      .put(app.actions.loader.hide.action())
      .put(apiConfig.actionSuccess(apiSucces.data.result, 'fulfilled'))
      .put(apiConfig.actionRes(apiSucces.data.result))
      .put(
        app.actions.dialog.success.action({
          data: apiConfig.success,
        }),
      )
      .call(apiConfig.callback, apiSucces.data.result)
      .run(1000)
      // eslint-disable-next-line
      .then(result => {
        // INFO: If you want all the effects consolidated in the order they were yielded, you can use the allEffects property from the resolved object.
        // const { storeState, allEffects, effects } = result;
        // allEffects.forEach(it => console.log(it));
      }),
  10000,
);

it(
  'Test api (error)',
  () =>
    expectSaga(apiCall, apiConfig)
      .provide([
        // Use the `select` effect creator from Redux Saga to match
        [sagaSelect(selectors.getSession), null],
        // Use the `call.fn` matcher from Redux Saga Test Plan
        [matchers.call.fn(apiConfig.api), apiError],
      ])
      .put(app.actions.loader.show.action())
      .put(app.actions.loader.hide.action())
      .put(apiConfig.actionRes(apiError.data, 'rejected'))
      .put(apiConfig.actionFailure(apiError.data))
      .put(
        app.actions.dialog.error.action({
          data: apiError.data.errors,
        }),
      )
      .run(),
  10000,
);

it(
  'Test api (fail)',
  () =>
    expectSaga(apiCall, apiConfig)
      .provide([
        // Use the `select` effect creator from Redux Saga to match
        [sagaSelect(selectors.getSession), null],

        // Use the `call.fn` matcher from Redux Saga Test Plan
        [matchers.call.fn(apiConfig.api), apiFail],
      ])
      .put(app.actions.loader.show.action())
      .put(app.actions.loader.hide.action())
      .put(apiConfig.actionRes(null, 'rejected'))
      .put(
        app.actions.dialog.error.action({
          data: 'The server is currently not responding',
        }),
      )
      .run(),
  10000,
);
