import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import './polyfills';

// styling
import './styles/seedMain.scss';

import * as serviceWorker from './serviceWorker';

import { configBrowserStore } from './store/setup';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const rootElement = document.getElementById('root');

const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const storeSetup = configBrowserStore({
  initialState: preloadedState,
});

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: storeSetup.store.getState(),
});

export default storeSetup;

let render = (): JSX => {
  // VERY IMPORTANT FOR HOT RELOADING WITH ROUTER V4+
  const ClientRoot = require('./appComponents/ClientApp').default;

  if (rootElement) {
    const isSSR = rootElement.hasChildNodes();
    const renderMethod = isSSR ? ReactDOM.hydrate : ReactDOM.render;

    const doRender = () =>
      renderMethod(
        <ClientRoot
          store={storeSetup.store}
          persistor={storeSetup.persistor}
          history={storeSetup.history}
        />,
        rootElement,
      );

    if (isSSR) {
      loadableReady(doRender);
    } else doRender();
  } else {
    throw new Error('rootElement not found!');
  }
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error): JSX => {
      const RedBox = require('redbox-react').default;

      if (rootElement) {
        ReactDOM.render(<RedBox error={error} />, rootElement);
      } else {
        throw new Error('rootElement not found!');
      }
    };

    render = (): JSX => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept(['./appComponents/ClientApp'], (): void =>
      setImmediate((): void => {
        ReactDOM.unmountComponentAtNode(rootElement);
        render();
      }),
    );

    // Setup hot module replacement

    module.hot.accept(['./styles/seedMain.scss'], (): void =>
      setImmediate((): void => {
        ReactDOM.unmountComponentAtNode(rootElement);
        render();
      }),
    );
  }
}

// Let's Go!
// ------------------------------------
render();
