import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Modals from 'components/global/Modals';
import Loader from 'components/global/Loader';
import Header from 'components/global/Header';

import App from 'components/layouts/App';
import Login from 'components/routes/Login';
import Loading from 'components/routes/Loading';

// FONT AWESOME
// import { library } from '@fortawesome/fontawesome-svg-core';
// free icons
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import SeoHandler from 'components/global/SeoHandler';
import Favicon from 'react-favicon';
import { Helmet } from 'react-helmet';
import image from './favicon/favicon.ico';
import styleIdentifiers from './main.scss';

// library.add(fab, fas, far);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  ready: boolean;
  session: Record<string, any>;
  loading: boolean;
}

export interface DispatchProps {
  bootup: Function;
}

export interface OwnProps {}

export type MainProps = StateProps & DispatchProps & OwnProps;

interface MainState {}

export default class Main extends Component<MainProps, MainState> {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
    };
  }

  componentDidMount(): void {
    const { bootup, ready, location, fakeLoading } = this.props;

    window.addEventListener('resize', this.isMobileDevice);
    this.isMobileDevice();

    if (location && location.pathname) {
      if (!ready && bootup) {
        bootup(location.pathname);
        this.isMobileDevice();
      }
      if (location.pathname !== '/') {
        fakeLoading(false);
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.isMobileDevice);
  }

  isMobileDevice = (): void => {
    const { setMobile, mobile } = this.props;
    const screen = window.innerWidth <= 480;

    if (screen !== mobile) {
      this.setState({ isMobile: screen });
      setMobile(screen);
    }
  };

  render() {
    const { ready, loading, location, hideHeader, stickyHeader } = this.props;
    const { isMobile } = this.state;

    return (
      <div className={styles('Main')}>
        {loading && location && location.pathname === '/' && !isMobile ? (
          <Loading />
        ) : (
          <>
            <Loader />
            <Modals />
            <SeoHandler />
            {!hideHeader && <Header />}
            {hideHeader && stickyHeader && <Header noAnim className={styles('sticky')} />}
            <Favicon url={image} />
            {ready && (
              <div className={styles('content')}>
                <Switch>
                  <Route component={App} />
                </Switch>
              </div>
            )}
          </>
        )}
        <Helmet>
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
        </Helmet>
      </div>
    );
  }
}
