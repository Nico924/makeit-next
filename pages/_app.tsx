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
import Head from 'next/head';
import Favicon from 'react-favicon';
import { useStore, wrapper } from '../lib/store';

function MyApp({ Component, pageProps, router, state }) {
  const store = useStore(state);

  const render = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store._persistor}>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Component {...pageProps} />
          <Modals />
          <SideMenus />
          <Favicon url="/favicon/favicon.ico" />
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link
              rel="preload"
              as="style"
              href="https://fonts.googleapis.com/css?family=Chivo:300,300i,400,400i,700,700i,900,900i&display=swap"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Chivo:300,300i,400,400i,700,700i,900,900i&display=swap"
              rel="stylesheet"
            />
          </Head>
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
