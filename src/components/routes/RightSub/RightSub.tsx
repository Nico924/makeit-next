import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import CardItem from 'components/items/CardItem';
import WorkerPresentation from 'components/items/WorkerPresentation';
import MachineCardItem from 'components/listItems/MachineCardItem';
import RellaxItem from 'components/items/RellaxItem';
import SeoHandler from 'components/global/SeoHandler';
import Illustration from 'components/items/Illustration';
import styleIdentifiers from './rightSub.scss';

// Import images assets
import Wall from './assets/wall.svg';
import Stats from './assets/stats.svg';
import Money from './assets/money.svg';
import Build from './assets/build.svg';
import Checked from './assets/checked.svg';
import ArrowDown from './assets/arrow-down.svg';
import Smile from './assets/smile.png';
import Machine from './assets/machine.svg';
import Shot from './assets/shot.svg';
import Investor from './assets/investor.jpg';
import JoinTeam from './assets/jointeam.jpg';

// Photos
import ThomasAudrey from './assets/makeit-studio-tom-and-audrey.jpg';
import VictorAbout from './assets/victor-about.jpg';
import Max from './assets/max.jpg';
import Tipaw from './assets/tipaw.jpg';
import Helpi from './assets/helpi.jpg';
import FullUp from './assets/fullup.jpg';
import Aerosint from './assets/aerosint.jpg';
import Thumbnail from './assets/thumbnail.png';

// Import Logos
import beangels from './logos/beangels.svg';
import becentral from './logos/becentral.jpg';
import bep from './logos/bep.jpg';
import ebs from './logos/ebs.jpg';
import epitech from './logos/epitech.jpg';
import hubbrussels from './logos/hubbrussels.jpg';
import ing from './logos/ing.jpg';
import leansquare from './logos/leansquare.jpg';
import solvay from './logos/solvay.jpg';
import venturelab from './logos/venturelab.svg';
import windows from './logos/windows.jpg';
import fortis from './logos/fortis.jpg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type RightSubProps = StateProps & DispatchProps & OwnProps;

interface RightSubState {
  machine: Record<string, any> | boolean;
}

export default class RightSub extends Component<RightSubProps, RightSubState> {
  constructor(props) {
    super(props);

    this.state = { machine: false };
  }

  componentDidMount(): void {
    const { mobile, location } = this.props;

    if (location && location.state && location.state.section) {
      setTimeout((): void => this.scrollToSection(location.state.section), 100);
    }

    if (!mobile) {
      document.addEventListener('scroll', this.magicScroll);
    }
    if (mobile) this.setState({ machine: 20 });
  }

  componentDidUpdate(prevProps): void {
    const { mobile, location } = this.props;
    if (prevProps.mobile !== mobile) {
      if (mobile) document.addEventListener('scroll', this.magicScroll);
    }

    if (prevProps.location.state !== location.state) {
      if (location && location.state && location.state.section) {
        this.scrollToSection(location.state.section);
      }
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('scroll', this.magicScroll);
  }

  scrollToSection = section => {
    if (this[section]) {
      this[section].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  magicScroll = (): void | boolean => {
    const result = this.elementInViewport(this.machine);
    const sub = Math.floor(result / 75);
    if (sub < 0) {
      this.setState({ machine: false });
    } else if (sub >= 20) {
      return false;
    } else {
      this.setState({ machine: sub });
    }
  };

  elementInViewport = (el: any): boolean => {
    const middleScreen = window.innerHeight / 2;

    return window.pageYOffset + middleScreen - el.offsetTop;
  };

  setRef = (node: any, elem: string): void => {
    if (node) this[elem] = node;
  };

  render(): JSX {
    const { machine } = this.state;
    const { mobile, history } = this.props;

    return (
      <div className={styles('RightSub')}>
        <SeoHandler path="web.right.seo" image={Thumbnail} />
        <section
          ref={(el): void => this.setRef(el, 'first')}
          className={styles('section', 'first')}
        >
          <div className={styles('content')}>
            <Illustration illu="exclamation" className={styles('icon')} />
            <div className={styles('first-text')}>
              <TextItem path="web.right.first.text" isHtml />
            </div>
            <CustomButton
              action={(): void =>
                this.second.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className={styles('button')}
              color="pink"
              label="web.right.first.button"
              id="right-section1"
            />
            <div className={styles('arrow-container')}>
              <img src={Smile} alt="smile" className={styles('smile')} />
              <img src={ArrowDown} alt="arrow-down" className={styles('arrow')} />
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'second')}
          className={styles('section', 'second')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <RellaxItem type="triangle" noParallax className={styles('triangle')} />
            <div className={styles('title')}>
              <TextItem path="web.right.second.title" isHtml />
            </div>
            <div className={styles('text')}>
              <TextItem path="web.right.second.text" isHtml />
            </div>
            <div className={styles('image-container')}>
              <div className={styles('image', 'one')}>
                <WorkerPresentation
                  pictureClassName={styles('picture')}
                  hideDescInMobile
                  picture={VictorAbout}
                />
              </div>
              <div className={styles('image')}>
                <WorkerPresentation pictureClassName={styles('picture')} picture={Max} />
              </div>
            </div>
            <div className={styles('container-button')}>
              <CustomButton
                action={(): void =>
                  this.machine.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                color="grey"
                label="web.right.second.button"
                className={styles('button-second', 'button-section')}
                id="right-section2"
              />
            </div>
          </div>
        </section>
        <section
          className={styles('section', 'third')}
          ref={(el): void => this.setRef(el, 'machine')}
          id="third"
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <RellaxItem noParallax type="oval" className={styles('oval')} />
            <div className={styles('title')}>
              <TextItem path="web.right.third.title" isHtml />
            </div>
            <div className={styles('text')}>
              <TextItem path="web.right.third.text" isHtml />
            </div>
            <div className={styles('machine')}>
              <div className={styles('left')}>
                <MachineCardItem
                  title="web.right.third.card1.title"
                  active={machine >= 1}
                  linkBottom
                  activeLink={machine >= 3}
                >
                  <img src={Checked} alt="illustration" className={styles('image')} />
                  <div className={styles('card-content')}>
                    <div className={styles('card-title')}>
                      <TextItem path="web.right.third.card1.subtitle" isHtml />
                    </div>
                    <div className={styles('card-text')}>
                      <TextItem path="web.right.third.card1.text" isHtml />
                    </div>
                  </div>
                </MachineCardItem>
                <MachineCardItem
                  title="web.right.third.card2.title"
                  linkRight
                  linkTop={5}
                  active={machine >= 2}
                  activeLink={machine >= 5}
                >
                  <img src={Build} alt="illustration" className={styles('image')} />
                  <div className={styles('card-content')}>
                    <div className={styles('card-title')}>
                      <TextItem path="web.right.third.card2.subtitle" isHtml />
                    </div>
                    <div className={styles('card-text')}>
                      <TextItem path="web.right.third.card2.text" isHtml />
                    </div>
                  </div>
                </MachineCardItem>
                <MachineCardItem
                  className={styles('image-machine-phone')}
                  contentClassName={styles('content-image-machine')}
                  active={machine >= 10}
                >
                  <img src={Machine} alt="illustration" className={styles('image-machine')} />
                </MachineCardItem>
              </div>
              <div className={styles('right')}>
                <MachineCardItem
                  title="web.right.third.card3.title"
                  linkBottom
                  active={machine >= 4}
                  activeLink={machine >= 7}
                >
                  <img src={Money} alt="illustration" className={styles('image')} />
                  <div className={styles('card-content')}>
                    <div className={styles('card-title')}>
                      <TextItem path="web.right.third.card3.subtitle" isHtml />
                    </div>
                    <div className={styles('card-text')}>
                      <TextItem path="web.right.third.card3.text" isHtml />
                    </div>
                  </div>
                </MachineCardItem>
                <MachineCardItem
                  title="web.right.third.card4.title"
                  linkBottom
                  activeLink={machine >= 9}
                  active={machine >= 6}
                >
                  <img src={Wall} alt="illustration" className={styles('image')} />
                  <div className={styles('card-content')}>
                    <div className={styles('card-title')}>
                      <TextItem path="web.right.third.card4.subtitle" isHtml />
                    </div>
                    <div className={styles('card-text')}>
                      <TextItem path="web.right.third.card4.text" isHtml />
                    </div>
                  </div>
                </MachineCardItem>
                <MachineCardItem title="web.right.third.card5.title" active={machine >= 8}>
                  <img src={Stats} alt="illustration" className={styles('image')} />
                  <div className={styles('card-content')}>
                    <div className={styles('card-title')}>
                      <TextItem path="web.right.third.card5.subtitle" isHtml />
                    </div>
                    <div className={styles('card-text')}>
                      <TextItem path="web.right.third.card5.text" isHtml />
                    </div>
                  </div>
                </MachineCardItem>
                <div className={styles('container-button')}>
                  <CustomButton
                    action={(): void => history.push('/contact')}
                    className={styles('button-section')}
                    label="web.right.third.button"
                    color="grey"
                    id="right-section3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'fourth')}
          className={styles('section', 'fourth')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <RellaxItem type="polygone" className={styles('poly')} noParallax />
            <div className={styles('shot')}>
              <img alt="hit-marker" src={Shot} />
            </div>
            <div className={styles('title')}>
              <TextItem path="web.right.fourth.title" isHtml />
            </div>
            <div className={styles('text')}>
              <TextItem path="web.right.fourth.text" isHtml />
            </div>
            <div className={styles('card')}>
              <CardItem
                noHeader={mobile}
                className={styles('item')}
                contentClassName={styles('text-item')}
                noLine
              >
                <TextItem path="web.right.fourth.card" isHtml />
              </CardItem>
              <WorkerPresentation
                className={styles('worker')}
                pictureClassName={styles('picture')}
                picture={ThomasAudrey}
                hideDescInMobile
              />
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'fifth')}
          className={styles('section', 'fifth')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <RellaxItem
              noParallax
              className={styles('triangle')}
              type="triangle"
              color="#fad843"
              width={80}
            />
            <div className={styles('title')}>
              <TextItem path="web.right.fifth.title" isHtml />
            </div>
            <div className={styles('first-text')}>
              <TextItem path="web.right.fifth.text" isHtml />
            </div>
            <div className={styles('container-button')}>
              <CustomButton
                className={styles('button-section')}
                color="pink"
                action={(): void => history.push('/contact')}
                label="web.right.fifth.button"
                id="right-section5"
              />
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'sixth')}
          className={styles('section', 'sixth')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <div className={styles('title')}>
              <TextItem path="web.right.sixth.title" isHtml />
            </div>
            <div className={styles('text')}>
              <TextItem path="web.right.sixth.text" isHtml />
            </div>
            <div className={styles('worker-container')}>
              <WorkerPresentation
                textClassName={styles('text-worker-container')}
                picture={FullUp}
                title="web.right.sixth.fullupTitle"
              >
                <div className={styles('worker-text')}>
                  <TextItem isHtml path="web.right.sixth.fullup" />
                </div>
              </WorkerPresentation>
              <WorkerPresentation
                textClassName={styles('text-worker-container')}
                picture={Tipaw}
                title="web.right.sixth.tipawTitle"
              >
                <div className={styles('worker-text')}>
                  <TextItem isHtml path="web.right.sixth.tipaw" />
                </div>
              </WorkerPresentation>
              <WorkerPresentation
                textClassName={styles('text-worker-container')}
                picture={Helpi}
                title="web.right.sixth.helpiTitle"
              >
                <div className={styles('worker-text')}>
                  <TextItem isHtml path="web.right.sixth.helpi" />
                </div>
              </WorkerPresentation>
              <WorkerPresentation
                textClassName={styles('text-worker-container')}
                picture={Aerosint}
                title="web.right.sixth.aerosintTitle"
              >
                <div className={styles('worker-text')}>
                  <TextItem isHtml path="web.right.sixth.aerosint" />
                </div>
              </WorkerPresentation>
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'seventh')}
          className={styles('section', 'seventh')}
        >
          <div className={styles('content')}>
            <RellaxItem noParallax className={styles('oval')} type="oval" color="#3970af" />
            <div className={styles('rectangle', 'one')} />
            <div className={styles('title')}>
              <TextItem path="web.right.seventh.title" isHtml />
            </div>
            <div className={styles('text')}>
              <TextItem path="web.right.seventh.text" isHtml />
            </div>
            <CardItem
              noLine
              className={styles('content-partner')}
              contentClassName={styles('content-card')}
              noHeader={mobile}
            >
              <div className={styles('partner')}>
                <div className={styles('partner-img', 'small')}>
                  <img src={windows} alt="windows-logo" />
                </div>
              </div>
              <div className={styles('partner')}>
                <div className={styles('partner-img')}>
                  <img src={leansquare} alt="leansquare-logo" />
                </div>
              </div>
              <div className={styles('partner')}>
                <div className={styles('partner-img')}>
                  <img src={fortis} alt="fortis-logo" />
                </div>
              </div>
              <div className={styles('partner')}>
                <div className={styles('partner-img')}>
                  <img src={solvay} alt="solvay-logo" />
                </div>
              </div>
              <div className={styles('partner')}>
                <div className={styles('partner-img')}>
                  <img src={hubbrussels} alt="hubbrussels-logo" />
                </div>
              </div>
              {!mobile && (
                <>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={epitech} alt="epitech-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img', 'small')}>
                      <img src={bep} alt="bep-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={venturelab} alt="venturelab-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={beangels} alt="beangels-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={ebs} alt="ebs-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={ing} alt="ing-logo" />
                    </div>
                  </div>
                  <div className={styles('partner')}>
                    <div className={styles('partner-img')}>
                      <img src={becentral} alt="becentral-logo" />
                    </div>
                  </div>
                </>
              )}
            </CardItem>
            <div className={styles('container-button')}>
              <CustomButton
                action={(): void => history.push('/contact')}
                color="grey"
                label="web.right.seventh.button"
                id="right-section7"
                className={styles('button-section')}
              />
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'eighth')}
          className={styles('section', 'eighth')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <RellaxItem className={styles('rect')} noParallax type="rectangle" color="#64c1be" />
            <div className={styles('title')}>
              <TextItem path="web.right.eighth.subtitle" isHtml />
            </div>
            <div className={styles('card-container')}>
              <div className={styles('image')}>
                <img src={Investor} alt="meeting" />
              </div>
              <CardItem
                className={styles('card-item')}
                noLine
                contentClassName={styles('content-card')}
                noHeader={mobile}
              >
                <TextItem path="web.right.eighth.card" isHtml />
              </CardItem>
            </div>
            <div className={styles('container-button')}>
              <CustomButton
                action={(): void => history.push('/contact')}
                color="pink"
                label="web.right.eighth.button"
                className={styles('button-section')}
                id="right-section8"
              />
            </div>
          </div>
        </section>
        <section
          ref={(el): void => this.setRef(el, 'nineth')}
          className={styles('section', 'nineth')}
        >
          <div className={styles('content')}>
            <div className={styles('rectangle', 'one')} />
            <div className={styles('title')}>
              <TextItem path="web.right.nineth.title" isHtml />
            </div>
            <div className={styles('card-container')}>
              <CardItem
                noLine
                className={styles('card-item')}
                contentClassName={styles('content-card')}
                noHeader={mobile}
              >
                <TextItem path="web.right.nineth.card" isHtml />
              </CardItem>
            </div>
            <WorkerPresentation picture={JoinTeam} hideDescInMobile className={styles('worker')} />
            <div className={styles('container-button')}>
              <CustomButton
                action={(): void => history.push('/jobs')}
                className={styles('button-section')}
                label="web.right.nineth.button"
                color="pink"
                id="right-section9"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
