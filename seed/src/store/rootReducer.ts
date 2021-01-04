/*
Seed root import the reducers from the parent app and add the following three reducers
- content
- app
- session
If by any reason, one of these three reducers must be rewritten, just create a new reducer in the parent and do not use the same name as here
*/

import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// from the parent
import parentReducers, { AppStoreState } from 'store/appReducers';

// locally
import auth from './auth';
import app from './app';
import content from './content';
import file from './file';
import geoloc from './geoloc';

const reducers = {
  content: content.reducer,
  app: app.reducer,
  session: auth.reducer,
  file: file.reducer,
  geoloc: geoloc.reducer,
  // let the parent reducers overide eventually
  ...parentReducers,
};

// Return type is for function, reducersType come from the parent
export type StoreState = {
  app: ReturnType<typeof app.reducer>;
  content: ReturnType<typeof content.reducer>;
  session: ReturnType<typeof auth.reducer>;
  file: ReturnType<typeof file.reducer>;
  geoloc: ReturnType<typeof geoloc.reducer>;
  // article: ReturnType<typeof article.reducer>;
  // from history
  history: History;
} & AppStoreState;

const createRootReducer = (history, persistConfig) => {
  // connected router v5+
  const combinedReducers = combineReducers({
    ...reducers,
    router: connectRouter(history),
    form: formReducer,
  });

  const rootReducer = persistConfig
    ? persistReducer(persistConfig, combinedReducers)
    : combinedReducers;

  return rootReducer;
};

export default createRootReducer;
