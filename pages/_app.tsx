import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';
import Modals from 'components/global/Modals';
import SideMenus from 'components/global/SideMenus';
import config from 'config/general';
import client from 'store/rootApollo';
import 'styles/seedMain.scss';
import App, { AppContext } from 'next/app';
import { bootup } from 'store/bootup';
import React from 'react';
import { configNextStore } from 'store/setup';
import { wrapper } from '../lib/store';

function MyApp({ Component, pageProps, router, state }) {
  const store = configNextStore(state);

  const render = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store._persistor}>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Component {...pageProps} />
          <Modals />
          <SideMenus />
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  );

  if (config.apollo)
    return <ApolloProvider client={client.getInstance()}>{render()}</ApolloProvider>;

  return render();
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const store = appContext?.ctx?.store;

  await store._sagaRun(bootup).done;

  return { ...appProps, state: store.getState() };
};

export default wrapper.withRedux(MyApp);
