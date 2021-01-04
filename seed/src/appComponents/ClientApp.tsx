import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Main from 'components/layouts/Main';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';

import config from 'config/general';
import client from 'store/rootApollo';

// Default app used without SSR
const ClientApp = props => {
  const { store, history, persistor } = props;

  const renderApp = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
              <Main />
            </IconContext.Provider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  };

  if (!config.apollo) return renderApp();
  return <ApolloProvider client={client.getInstance()}>{renderApp()}</ApolloProvider>;
};

export default ClientApp;
