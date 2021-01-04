import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import loadable from '@loadable/component';

// routes (old way)
// import Home from 'components/routes/Home';
// import Staas from 'components/routes/Staas';
// import About from 'components/routes/About';
// import Software from 'components/routes/Software';
// import InvestingInIdeas from 'components/routes/InvestingInIdeas';
// import IdeaApplication from 'components/routes/IdeaApplication';
// import IdeaApplicationSecondStep from 'components/routes/IdeaApplicationSecondStep';
// import ThanksIdeaApplication from 'components/routes/ThanksIdeaApplication';
// import ContactPage from 'components/routes/ContactPage';
// import Partners from 'components/routes/Partners';

// layouts
// import BlogMain from 'components/layouts/BlogMain';
// import BusinessPrototypingMain from 'components/layouts/BusinessPrototypingMain';

// import RightSub from 'components/routes/RightSub';
// import JobMain from 'components/layouts/JobMain';
// import StartWith from 'components/routes/StartWith';
// import PrivacyPolicy from 'components/routes/PrivacyPolicy';
// import InvestingInIdeasOnboarding from 'components/routes/InvestingInIdeasOnboarding';
// import Sourcing from 'components/routes/Sourcing';
// import ParkPlace from 'components/routes/ParkPlace';

// thanks
// import ThanksPage from 'components/routes/ThanksPage';
// import ThanksPagePartners from 'components/routes/ThanksPagePartners';
// import ThanksSourcing from 'components/routes/ThanksSourcing';
// import ThanksPageStaas from 'components/routes/ThanksPageStaas';
// import ThanksPageSoftware from 'components/routes/ThanksPageSoftware';

import Footer from 'components/global/Footer';

import LeftSub from 'components/routes/LeftSub';
import Page404 from 'components/routes/Page404';

import styleIdentifiers from './app.scss';

// Routes
const Home = loadable(() => import('components/routes/Home'));
const About = loadable(() => import('components/routes/About'));
const Staas = loadable(() => import('components/routes/Staas'));
const Software = loadable(() => import('components/routes/Software'));
const InvestingInIdeas = loadable(() => import('components/routes/InvestingInIdeas'));
const IdeaApplication = loadable(() => import('components/routes/IdeaApplication'));
const IdeaApplicationSecondStep = loadable(() => import('components/routes/Staas'));
const ThanksIdeaApplication = loadable(() => import('components/routes/ThanksIdeaApplication'));
const ContactPage = loadable(() => import('components/routes/ContactPage'));
const Partners = loadable(() => import('components/routes/Partners'));

const StartWith = loadable(() => import('components/routes/StartWith'));
const PrivacyPolicy = loadable(() => import('components/routes/PrivacyPolicy'));
const InvestingInIdeasOnboarding = loadable(() =>
  import('components/routes/InvestingInIdeasOnboarding'),
);
const Sourcing = loadable(() => import('components/routes/Sourcing'));
const ParkPlace = loadable(() => import('components/routes/ParkPlace'));
// Thanks
const ThanksPage = loadable(() => import('components/routes/ThanksPage'));
const ThanksPagePartners = loadable(() => import('components/routes/ThanksPagePartners'));
const ThanksSourcing = loadable(() => import('components/routes/ThanksSourcing'));
const ThanksPageStaas = loadable(() => import('components/routes/ThanksPageStaas'));
const ThanksPageSoftware = loadable(() => import('components/routes/ThanksPageSoftware'));

// layouts
const BlogMain = loadable(() => import('components/layouts/BlogMain'));
const BusinessPrototypingMain = loadable(() =>
  import('components/layouts/BusinessPrototypingMain'),
);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type AppProps = StateProps & DispatchProps & OwnProps;

interface AppState {}

const configSmallHeader = ['blog', 'jobs'];
const configNoHeader = ['investinideas', 'investonboarding', ''];

export default class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      hideFooter: false,
    };
  }

  componentDidMount() {
    this.checkSizeHeader();
    const localACEmail = localStorage.getItem('ACemail');

    if (localACEmail && window && window.vgo) {
      window.vgo('setEmail', localACEmail);
      window.vgo('process');
    }
  }

  componentDidUpdate(prevProps: AppProps): void {
    const { location } = this.props;
    if (prevProps.location && location && location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      this.checkSizeHeader();
    }

    if (prevProps.location !== location) {
      window.vgo('update');
      window.vgo('process');
    }
  }

  checkSizeHeader = () => {
    const { location, header, toggleHeader, hideHeader } = this.props;
    const firstPart = location.pathname.split('/')[1];
    if (firstPart && configNoHeader.indexOf(firstPart) !== -1) {
      hideHeader(true);
      this.setState({ hideFooter: true });
    } else if (firstPart === '') {
      hideHeader(true);
    } else {
      hideHeader(false);
      this.setState({ hideFooter: false });
    }

    if (firstPart && configSmallHeader.indexOf(firstPart) !== -1) {
      if (!header) {
        toggleHeader(true);
      }
    } else {
      toggleHeader(false);
    }
  };

  render() {
    const {
      match: { isExact },
      location: { pathname },
    } = this.props;
    const { hideFooter } = this.state;

    return (
      <div className={styles('App')}>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" component={RightSub} /> */}
          <Route exact path="/about" component={About} />
          <Route exact path="/the-club" component={LeftSub} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/start-with-makeit" component={StartWith} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/parkplace" component={ParkPlace} />
          <Route exact path="/investonboarding" component={InvestingInIdeasOnboarding} />
          <Route exact path="/investinideas" component={InvestingInIdeas} />
          <Route exact path="/startup-as-a-service" component={Staas} />
          <Route exact path="/thank-you-startup-as-a-service" component={ThanksPageStaas} />
          <Route path="/blog" component={BlogMain} />
          {/* <Route path="/jobs" component={JobMain} /> */}
          <Route path="/business-prototyping-arena" component={BusinessPrototypingMain} />
          <Route path="/we-invest-in-ideas" component={Sourcing} />
          <Route path="/thanks-entrepreneurs" component={ThanksSourcing} />
          <Route path="/we-invest-in-ideas-application" component={IdeaApplication} />
          <Route
            path="/we-invest-in-ideas-application-step-2"
            component={IdeaApplicationSecondStep}
          />
          <Route path="/mobile-and-web-apps-development" component={Software} />
          <Route
            exact
            path="/thank-you-mobile-and-web-apps-development"
            component={ThanksPageSoftware}
          />
          <Route
            path="/thank-you-we-invest-in-ideas-application"
            component={ThanksIdeaApplication}
          />
          <Route exact path="/thank-you-contact" component={ThanksPage} />
          <Route exact path="/partners" component={Partners} />
          <Route exact path="/thank-you-partnerships" component={ThanksPagePartners} />

          <Route component={Page404} />
        </Switch>
        {/* {!isExact && !hideFooter && ( */}
        <Footer
          FooterInfo={
            // pathname !== '/' &&
            pathname !== '/blog/thank-you-blog'
          }
          FooterCta={pathname === '/#' || pathname === '/blog'}
          latestPost={pathname === '/#' || pathname === '/the-club'}
        />
        {/* )} */}
      </div>
    );
  }
}
