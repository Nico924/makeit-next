import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { bootup } from 'store/bootup';
import app from 'store/app';
import content from 'store/content';

import { accountActions } from 'store/actions/account';
import { api } from 'store/apis';

const mockApiResponse = {
  status: 200,
  data: {
    success: true,
    elements: [
      {
        home: {
          title: 'test',
        },
      },
    ],
  },
};

const mockState = {
  session: {
    data: null,
  },
};
it(
  'Bootup check ',
  () =>
    expectSaga(bootup)
      .withState(mockState)
      .provide([
        // Use the `call.fn` matcher from Redux Saga Test Plan
        [matchers.call.fn(api.app.contentDev), mockApiResponse],
      ])
      .put(app.actions.loader.show.action())
      // .call(api.getDev)
      .put(content.actions.content.result(mockApiResponse.data, 'fulfilled'))
      .put(app.actions.bootup.result.action())
      .put(app.actions.loader.hide.action())
      .run(5000),
  10000,
);
