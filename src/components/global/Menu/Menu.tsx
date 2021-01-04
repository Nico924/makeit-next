import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Link } from 'next/link';
import { Spring, animated } from 'react-spring/renderprops.cjs';
import Image from 'next/image';
import styleIdentifiers from './menu.module.scss';

// assets
const Folder = '/assets/folder.svg';
const Facebook = '/assets/facebook2.svg';
const Instagram = '/assets/instagram2.svg';
const Linkedin = '/assets/linkedin2.svg';
const Earth = '/assets/earth.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type MenuProps = StateProps & DispatchProps & OwnProps;

interface MenuState {}

// Config for Link in Menu

const configUserView = [
  { icon: Folder, name: 'About', link: '/about', state: 'second' },
  // { icon: Folder, name: 'The Machine', link: '/about', state: 'machine' },
  // { icon: Folder, name: 'Vision', link: '/about', state: 'fourth' },
  // { icon: Folder, name: 'Startups', link: '/about', state: 'sixth' },
  // { icon: Folder, name: 'Investor', link: '/about', state: 'eighth' },
  // { icon: Folder, name: 'Careers', link: '/about', state: 'nineth' },
  { icon: Folder, name: 'Contact', link: '/contact' },
  { icon: Folder, name: 'Partnerships', link: '/partners' },
  { icon: Folder, name: 'Product development', link: '/mobile-and-web-apps-development' },
  // { icon: Folder, name: 'Ask Us Anything', link: '/contact' },
  { icon: Folder, name: 'Startup As A Service', link: '/startup-as-a-service' },
  { icon: Folder, name: 'We Invest In Idea', link: '/we-invest-in-ideas' },
  { icon: Folder, name: 'Privacy Policy', link: '/privacy-policy' },
];

const configSocialView = [
  // { icon: Earth, name: 'The Perfect <br/> Co-Founder', isHtml: true },
  {
    icon: Facebook,
    name: 'Facebook',
    link: 'https://www.facebook.com/MakeitStartupStudio/',
    external: true,
  },
  {
    icon: Instagram,
    name: 'Instagram',
    link: 'https://www.instagram.com/makeit.startup.studio/',
    external: true,
  },

  {
    icon: Linkedin,
    name: 'Linkedin',
    link: 'https://www.linkedin.com/company/makeitgroup/',
    external: true,
  },
];

const configEventView = [
  // {
  //   icon: Earth,
  //   name: 'The Pitch Arena',
  //   external: true,
  //   link: 'https://pitcharena.makeit-group.com/en/',
  // },
  // {
  //   icon: Earth,
  //   name: 'Business Prototyping Arena',
  //   link: '/business-prototyping-arena',
  // },
];

const configBlogView = [{ icon: Earth, name: 'Home', link: '/blog' }];

const configJobView = [{ icon: Earth, name: 'Home', link: '/jobs' }];

// End Config

const ContentView = props => {
  const { config, small } = props;
  return (
    config &&
    config.map((item, key) =>
      item.external ? (
        <a
          href={item.link}
          className={styles('item', 'user-item')}
          key={key}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => props.close()}
        >
          <Image
            width={50}
            height={50}
            className={styles('image')}
            src={item.icon}
            alt="link-icon"
          />
          <div className={styles('title', small && 'small-title')}>{item.name}</div>
        </a>
      ) : (
        <a
          onClick={() => props.close()}
          href={item.link || '/'}
          className={styles('item', 'user-item')}
          key={key}
        >
          <Image
            width={50}
            height={50}
            className={styles('image')}
            src={item.icon}
            alt="link-icon"
          />
          <div className={styles('title', small && 'small-title')}>
            <TextItem path={item.name} isHtml={item.isHtml} />
          </div>
        </a>
      ),
    )
  );
};

const ContentMobileView = props => {
  const { config } = props;
  return (
    config &&
    config.map((item, key) =>
      item.external ? (
        <a
          href={item.link}
          className={styles('item-mobile', 'user-item')}
          key={key}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => props.close()}
        >
          <div className={styles('bullet-container')}>
            <div className={styles('bar')} />
            <div className={styles('bullet')} />
          </div>
          <div className={styles('title')}>{item.name}</div>
        </a>
      ) : (
        <a
          onClick={() => props.close()}
          href={item.link || '/'}
          className={styles('item-mobile', 'user-item')}
          key={key}
        >
          <div className={styles('bullet-container')}>
            <div className={styles('bar')} />
            <div className={styles('bullet')} />
          </div>
          <div className={styles('title')}>
            <TextItem path={item.name} isHtml={item.isHtml} />
          </div>
        </a>
      ),
    )
  );
};

export default class Menu extends Component<MenuProps, MenuState> {
  constructor(props) {
    super(props);

    this.state = {
      view: props.mobile ? null : 'user',
    };
  }

  componentDidMount() {
    const { getAllArticles, getAllJobs, sectionStart } = this.props;
    getAllArticles();
    getAllJobs();
    if (sectionStart) this.setState({ view: sectionStart });
  }

  closeMenu = () => {
    const { dialogHide } = this.props;
    dialogHide('custom');
  };

  generateBlogViewConfig = () => {
    const { articles, lg } = this.props;
    const config = [];
    if (articles && articles.data) {
      articles.data.map(item => {
        config.push({
          icon: Earth,
          name: item.title,
          link: `/blog/${(item.urls && item.urls[lg]) || ''}`,
        });
      });
    }
    return config;
  };

  generateJobViewConfig = () => {
    const { jobs } = this.props;
    const config = [];
    if (jobs && jobs.data) {
      jobs.data.map(item => {
        config.push({
          icon: Earth,
          name: item.title,
          link: `/jobs/${item.url}`,
        });
      });
    }
    return config;
  };

  renderGoodView = () => {
    const { view } = this.state;

    switch (view) {
      case 'user':
        return <ContentView config={configUserView} close={this.closeMenu} />;
      case 'external':
        return <ContentView config={configSocialView} close={this.closeMenu} />;
      case 'event':
        return <ContentView config={configEventView} close={this.closeMenu} />;
      case 'blog':
        return (
          <ContentView
            config={configBlogView.concat(this.generateBlogViewConfig())}
            close={this.closeMenu}
            small
          />
        );
      case 'job':
        return (
          <ContentView
            config={configJobView.concat(this.generateJobViewConfig())}
            close={this.closeMenu}
            small
          />
        );
      default:
        return false;
    }
  };

  render() {
    const { view } = this.state;
    return (
      <div className={styles('Menu')}>
        <div className={styles('link-container')}>
          <div
            className={styles('link', view === 'user' && 'active')}
            onClick={(): void => this.setState({ view: 'user' })}
          >
            <div className={styles('indicator')} />
            <div className={styles('name')}>Make it Disk</div>
          </div>
          <Spring
            native
            force
            from={{ height: view === 'user' ? 0 : 'auto' }}
            to={{ height: view === 'user' ? 'auto' : 0 }}
          >
            {props => (
              <animated.div style={props} className={styles('content-mobile')}>
                <ContentMobileView close={this.closeMenu} config={configUserView} />
              </animated.div>
            )}
          </Spring>
          <div
            className={styles('link', view === 'external' && 'active')}
            onClick={(): void => this.setState({ view: 'external' })}
          >
            <div className={styles('indicator')} />
            <div className={styles('name')}>Social Media Disk</div>
          </div>
          <Spring
            native
            force
            from={{ height: view === 'external' ? 0 : 'auto' }}
            to={{ height: view === 'external' ? 'auto' : 0 }}
          >
            {props => (
              <animated.div style={props} className={styles('content-mobile')}>
                <ContentMobileView close={this.closeMenu} config={configSocialView} />
              </animated.div>
            )}
          </Spring>
          {/* <div
            className={styles('link', view === 'event' && 'active')}
            onClick={(): void => this.setState({ view: 'event' })}
          >
            <div className={styles('indicator')} />
            <div className={styles('name')}>Events</div>
          </div> */}
          <Spring
            native
            force
            from={{ height: view === 'event' ? 0 : 'auto' }}
            to={{ height: view === 'event' ? 'auto' : 0 }}
          >
            {props => (
              <animated.div style={props} className={styles('content-mobile')}>
                <ContentMobileView close={this.closeMenu} config={configEventView} />
              </animated.div>
            )}
          </Spring>
          <div
            className={styles('link', view === 'blog' && 'active')}
            onClick={(): void => {
              this.setState({ view: 'blog' });
            }}
          >
            <div className={styles('indicator')} />
            <div className={styles('name')}>Blog</div>
          </div>
          <Spring
            native
            force
            from={{ height: view === 'blog' ? 0 : 'auto' }}
            to={{ height: view === 'blog' ? 'auto' : 0 }}
          >
            {props => (
              <animated.div style={props} className={styles('content-mobile')}>
                <ContentMobileView
                  close={this.closeMenu}
                  config={configBlogView.concat(this.generateBlogViewConfig())}
                />
              </animated.div>
            )}
          </Spring>
          {/* <div
            className={styles('link', view === 'job' && 'active')}
            onClick={(): void => {
              this.setState({ view: 'job' });
            }}
          >
            <div className={styles('indicator')} />
            <div className={styles('name')}>Jobs</div>
          </div> */}
          <Spring
            native
            force
            from={{ height: view === 'job' ? 0 : 'auto' }}
            to={{ height: view === 'job' ? 'auto' : 0 }}
          >
            {props => (
              <animated.div style={props} className={styles('content-mobile')}>
                <ContentMobileView
                  close={this.closeMenu}
                  config={configJobView.concat(this.generateJobViewConfig())}
                />
              </animated.div>
            )}
          </Spring>
        </div>
        <div className={styles('content')}>{this.renderGoodView()}</div>
      </div>
    );
  }
}
