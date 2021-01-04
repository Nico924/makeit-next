import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Main from 'components/layouts/Main';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';

import config from 'config/general';
import client from 'store/rootApollo';

// Static server app (to have prefilled html)
const ServerApp = props => {
  const { store, location, context } = props;

  const renderApp = () => {
    return (
      <Provider store={store}>
        <StaticRouter context={context || {}} location={location}>
          <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <Main server />
          </IconContext.Provider>
        </StaticRouter>
      </Provider>
    );
  };

  if (!config.apollo) return renderApp();
  return <ApolloProvider client={client}>{renderApp()}</ApolloProvider>;
};

export default ServerApp;
