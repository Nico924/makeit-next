import { createStore, compose, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { persistStore, getStoredState } from 'redux-persist';
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import BrowserCookies from 'cookies-js';
import ServerCookies from 'cookies';

import { config } from 'config/general';
import rootSaga from 'store/rootSaga';
import { createUniversalHistory } from 'store/setup/history';
import createRootReducer from '../rootReducer';

interface StoreOption {
  initialState: {};
  middleware: [];
  req: {};
}

export const configNextStore = (initialState = {}) => {
  if (initialState._persist) delete initialState._persist;
  // Sagas
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [];

  const history = createUniversalHistory();

  // Dev tools
  let composeEnhancers;

  if (__DEV__) composeEnhancers = composeWithDevTools;
  else composeEnhancers = compose;

  // If needed
  const persistConfig = {
    key: config.storage.name,
    whitelist: config.storage.reducers,
    storage,
  };

  const rootReducer = createRootReducer(history, persistConfig);

  const preloadedState = initialState;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...[...middleware, sagaMiddleware])),
  );

  // add persistor
  const persistor = persistStore(store);

  store._persistor = persistor;
  store._sagaRun = sagaMiddleware.run;

  // Launch main saga
  sagaMiddleware.run(rootSaga);

  return store;
};

export const configServerStore = async (options: StoreOption = {}) => {
  const { req, res, middleware } = options;

  // Sagas
  const sagaMiddleware = createSagaMiddleware();

  const history = createUniversalHistory(req);
  // Dev tools
  const composeEnhancers = compose;

  let preloadedState = {};
  let rootReducer;
  if (config.serverStorage && config.cookieStorage) {
    const cookieJar = new NodeCookiesWrapper(new ServerCookies(req, res));

    // If needed
    const persistConfig = {
      key: config.storage.name,
      whitelist: config.storage.reducers,
      storage: new CookieStorage(cookieJar /* , options */),
      // stateReconciler(inboundState, originalState) {
      //   // Ignore state from cookies, only use preloadedState from window object
      //   return originalState;
      // },
    };

    // Server only
    try {
      preloadedState = await getStoredState(persistConfig);
      // remove _persist from preloaded state to avoid delay in the front
      delete preloadedState._persist;
    } catch (e) {
      // getStoredState implementation fails when index storage item is not set.
      preloadedState = {};
    }

    rootReducer = createRootReducer(history, persistConfig);
  } else {
    rootReducer = createRootReducer(history);
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...[...(middleware || []), sagaMiddleware, routerMiddleware(history)]),
    ),
  );

  // run saga
  sagaMiddleware.run(rootSaga);

  const setup = {
    store,
    history,
    sagaRun: sagaMiddleware.run,
  };
  return setup;
};

export const configBrowserStore = (options: StoreOption = {}) => {
  const initialState = options.initialState || {};
  const middleware = options.middleware || [];

  // Sagas
  const sagaMiddleware = createSagaMiddleware();

  const history = createUniversalHistory(options.req);
  // Dev tools
  let composeEnhancers;

  if (__DEV__) composeEnhancers = composeWithDevTools;
  else composeEnhancers = compose;

  // If needed
  const persistConfig = {
    key: config.storage.name,
    whitelist: config.storage.reducers,
    // type of storage : cookie for small sizes storage and storage for larger
    storage: config.cookieStorage
      ? new CookieStorage(
          BrowserCookies,
          config.cookieExpirationTime && {
            expiration: {
              default: config.cookieExpirationTime,
            },
          },
        )
      : storage,
    // stateReconciler(inboundState, originalState) {
    //   // Ignore state from cookies, only use preloadedState from window object
    //   return originalState;
    // },
  };

  const rootReducer = createRootReducer(history, persistConfig);

  const preloadedState = initialState;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...[...middleware, sagaMiddleware, routerMiddleware(history)]),
    ),
  );

  console.log('browser preloadedState state', preloadedState);

  // add persistor
  const persistor = persistStore(store);

  const setup = {
    store,
    persistor,
    history,
    sagaRun: sagaMiddleware.run,
  };

  // Launch main saga
  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for REDUCERS
    module.hot.accept('../rootReducer', (): void => {
      const nextCreateRootReducer = require('../rootReducer').default;

      const nextRootReducer = nextCreateRootReducer(history, persistConfig);

      store.replaceReducer(nextRootReducer);
    });

    // SAGA HOT RELOAD
    module.hot.accept('../rootSaga', (): void => {
      const getNewSagas = require('../rootSaga').default;

      sagaTask.cancel();
      sagaTask.done.then((): void => {
        sagaTask = sagaMiddleware.run(function* replacedSaga(): void {
          yield getNewSagas();
        });
      });
    });
  }

  return setup;
};
