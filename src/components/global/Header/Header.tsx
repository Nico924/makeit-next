import * as React from 'react';
import classNames from 'classnames/bind';
import CardItem from 'components/items/CardItem';
import Menu from 'components/global/Menu';
import { Spring } from 'react-spring/renderprops.cjs';

import Image from 'next/image';
import styleIdentifiers from './header.module.scss';

const Logo = '/assets/newLogo.svg';
const MenuIcon = '/assets/menu.svg';
const Folder = '/assets/folder.svg';
const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  dialogHide: Function;
  dialogShow: Function;
}

export interface OwnProps {}

export type HeaderProps = StateProps & DispatchProps & OwnProps;

interface HeaderState {}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  componentDidMount(): void {
    this.myFakeLoader = setTimeout((): void => this.tick(), 4000);
  }

  componentDidUpdate(prevProps): void {
    const { headerLarge } = this.props;
    if (prevProps.headerLarge !== headerLarge) {
      if (!headerLarge) {
        clearTimeout(this.myFakeLoader);
      }
    }
  }

  componentWillUnmount(): void {
    clearTimeout(this.myFakeLoader);
    if (this.timeoutID) clearTimeout(this.timeoutID);
  }

  tick = () => {
    const { step } = this.state;
    if (step === 4) {
      this.setState({ step: 0 });
    } else {
      this.setState({ step: step + 1 });
    }
    this.timeoutID = setTimeout((): void => this.tick(), 4000);
  };

  renderNumber = () => {
    const { step } = this.state;
    switch (step) {
      case 1:
        return '8';
      case 2:
        return '20M€';
      case 3:
        return '300+';
      case 4:
        return '15';
      case 0:
        return '2014';
      default:
        return '';
    }
  };

  renderText = () => {
    const { step } = this.state;
    switch (step) {
      case 1:
        return 'Revenue-generating startups created from the ground up (4 in BE, 4 in the US)';
      case 2:
        return 'Current portfolio valuation based on our latest fundraisings';
      case 3:
        return 'Financed by providing our services to 300+ clients';
      case 4:
        return '15 full-time professional startup builders: Design, Development, Marketing & Growth, Engineering, Business Development, and Entrepreneurship';
      case 0:
        return 'Startup Studio founded in 2014, active in Belgium and California';
      default:
        return '';
    }
  };

  showMenu = () => {
    const { dialogShow, dialogHide } = this.props;
    dialogShow({
      id: 'custom',
      large: true,
      wrapperClassName: 'modal-menu',
      children: (
        <CardItem
          className={styles('modal-menu-card')}
          noLine
          noPadding
          title="Make it Explorer"
          action={() => dialogHide('custom')}
          mobileCross
        >
          <Menu />
        </CardItem>
      ),
    });
  };

  render() {
    const { number } = this.state;
    const { word } = this.state;
    const {
      headerLarge,
      smallHeader,
      // match: { isExact },
      history,
      // location: { pathname },
      mobile,
      logoImg,
      className,
      classNameMenu,
      classNameHeader,
      noAnim,
    } = this.props;

    const pathname = '/';

    return (
      <div className={styles('container-Header', className)}>
        <Spring
          from={{ opacity: 1 }}
          to={{
            opacity: headerLarge ? 1 : 0,
            maxWidth: headerLarge ? 1080 : 203,
            sizeContainer: smallHeader ? 780 : 1080,
          }}
        >
          {({ opacity, maxWidth, sizeContainer }) => (
            <>
              <div
                className={styles('Header', classNameHeader)}
                style={{ maxWidth: `${sizeContainer}px` }}
              >
                <div className={styles('desktop')}>
                  <div
                    className={styles(
                      'main',
                      typeof window !== 'undefined' && 'show',
                      noAnim && 'no-animation',
                    )}
                  >
                    <div onClick={() => history.push('/')} className={styles('logo')}>
                      <Image width={220} height={85} src={logoImg || Logo} alt="logo" />
                    </div>
                    {pathname === '/' && (
                      <div className={styles('content')} style={{ maxWidth: `${maxWidth}px` }}>
                        <div className={styles('white')} style={{ opacity }}>
                          {this.renderNumber()}
                        </div>
                        <div className={styles('quote')} style={{ opacity }}>
                          {this.renderText()}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={styles(
                      'menu',
                      typeof window !== 'undefined' && 'show',
                      pathname === '/' ? 'slow' : 'fast',
                      noAnim && 'no-animation',
                    )}
                    onClick={this.showMenu}
                  >
                    <div className={styles('img')}>
                      <Image width={100} height={100} src={Folder} alt="menu" />
                    </div>
                    <div className={styles('icon')}>
                      <Image
                        width={100}
                        height={100}
                        src={MenuIcon}
                        alt="menu-icon"
                        className={styles('icon')}
                      />
                    </div>
                    <div className={styles('file', classNameMenu)}>Menu</div>
                  </div>
                </div>
                {/* {isExact && (
                  <div className={styles('phone-quote')}>
                    <h2>
                      Dude, don’t believe everything you read
                      <br />
                      or see on the internet. — Aristotle
                    </h2>
                  </div>
                )} */}
              </div>
            </>
          )}
        </Spring>
      </div>
    );
  }
}
