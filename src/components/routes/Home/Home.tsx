/* eslint-disable react/jsx-indent */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CardItem from 'components/items/CardItem';
import WorkerPresentation from 'components/items/WorkerPresentation';
// import loadable from '@loadable/component';

import Link from 'next/link';
import SeoHandler from 'components/global/SeoHandler';

import { Fade, Zoom } from 'react-reveal';
import Header from 'components/global/Header';
import get from 'lodash/get';
import find from 'lodash/find';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import Image from 'next/image';
import Footer from 'components/global/Footer';
import styleIdentifiers from './home.module.scss';

import { textAnimation, smileyAnimation } from './animations';

// assets

const fullup = '/assets/fullup.svg';
const aerosint = '/assets/aerosint.svg';
const epione = '/assets/epione.svg';
const parkplace = '/assets/parkplace.svg';
const infamy = '/assets/infamy.svg';
const tipaw = '/assets/tipaw.svg';
const yellowPoint = '/assets/yellowPoint.svg';
const box1 = '/assets/makeit_box.svg';
const box2 = '/assets/parkplace_box.svg';
const box3 = '/assets/epione_box.svg';
const box4 = '/assets/fullup_box.svg';
const box5 = '/assets/tipaw_box.svg';
const box6 = '/assets/aerosint_box.svg';
const box7 = '/assets/infamy_box.svg';
const boxLines = '/assets/half_dash_round.svg';
const halfRoundPink = '/assets/half_round_pink.svg';
const halfCarreYellow = '/assets/half_carre_yellow.svg';

// Anim assets
const ball = '/assets/anim/ball.svg';
const smiley = '/assets/anim/smiley.svg';
const rainbow = '/assets/anim/rainbow.svg';

// const Gsap = loadable.lib(() => import('gsap'), { ssr: false });
// const Reveal = loadable.lib(() => import('react-reveal'));

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  alreadyMounted: boolean;
  mobile: boolean;
}

export interface DispatchProps {
  toggleHeader: Function;
  setHomeMounted: Function;
}

export interface OwnProps {
  startupDisplay: object;
  intoView: array<string>;
}

export type HomeProps = StateProps & DispatchProps & OwnProps;

interface HomeState {}

const Home = (props: HomeProps) => {
  const { toggleHeader, stickyHeader, setStickyHeader, content } = props;

  const [gsapLib, setGsapLib] = useState(null);

  useEffect(() => {
    toggleHeader(true);
    return () => {
      toggleHeader(false);
    };
  }, []);

  const [startupDisplay, setStartupDisplay] = useState({});
  const [intoView, setIntoView] = useState([]);

  const Section3 = useRef(null);

  const handleScroll = () => {
    if (!Section3.current) return;

    if (Section3.current.getBoundingClientRect().top < 0) {
      if (!stickyHeader) setStickyHeader(true);
    } else if (stickyHeader) {
      setStickyHeader(false);
    }
  };

  const revealDeco = () => {
    const array = [];
    if (window.pageYOffset > 300) {
      if (!find(intoView, item => item === 'illu1')) array.push('illu1');
    }

    if (window.pageYOffset > 900) {
      if (!find(intoView, item => item === 'illu2')) array.push('illu2');
    }

    if (window.pageYOffset > 4300) {
      if (!find(intoView, item => item === 'illu4')) array.push('illu4');
    }

    handleScroll();

    const newArray = intoView.concat(array);
    setIntoView(newArray);
  };

  useEffect(() => {
    window.removeEventListener('scroll', revealDeco);
    window.addEventListener('scroll', revealDeco);

    return () => {
      window.removeEventListener('scroll', revealDeco);
    };
  }, [stickyHeader]);

  useEffect(() => {
    handleScroll();
  }, [Section3.current]);

  /**
   * Text animation
   */
  const titleRef = useRef();
  const subtitleRef = useRef();

  /**
   * Smiley animation
   */
  const ballRef = useRef();
  const rainbowRef = useRef();
  const smileyRef = useRef();
  const startup1Ref = useRef();
  const startup2Ref = useRef();
  const startup3Ref = useRef();
  const startup4Ref = useRef();
  const startup5Ref = useRef();
  const startup6Ref = useRef();

  // // save the gsap lib
  // const initGsap = lib => {
  //   console.log('INIT', lib);
  //   const gsap = lib.default;
  //   gsap.registerPlugin(ScrollTrigger);
  //   setGsapLib(gsap);
  // };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setGsapLib(gsap);
  }, []);

  // gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (!gsapLib) return () => {};
    const tl = textAnimation({ gsap: gsapLib, titleRef, subtitleRef });

    return () => {
      tl.kill();
    };
  }, [gsapLib]);

  useEffect(() => {
    if (!gsapLib) return () => {};

    console.log('gsapLib', gsapLib);
    const tl = smileyAnimation({
      gsap: gsapLib,
      ballRef,
      rainbowRef,
      smileyRef,
      startup1Ref,
      startup2Ref,
      startup3Ref,
      startup4Ref,
      startup5Ref,
      startup6Ref,
    });

    return () => {
      tl.kill();
    };
  }, [gsapLib]);

  const displayStartupBox = index => {
    setStartupDisplay({
      [`startup_${index}`]: true,
    });
  };

  const hideStartupBox = index => {
    setStartupDisplay({
      [`startup_${index}`]: false,
    });
  };

  const pathname = '';

  return (
    <div className={styles('containe-Home')}>
      <div className={styles('Home')}>
        {stickyHeader && <Header noAnim className={styles('sticky')} />}
        <SeoHandler path="web.home.seo" />
        <section className={styles('section1')}>
          <div className={styles('yellow_point')}>
            <Image layout="fill" src={yellowPoint} alt="yellowPoint" />
          </div>
          <div className={styles('contain_wrapper')}>
            <div className={styles('section_heading')}>
              <div ref={titleRef} className={styles('title', 'white', 'text-center')}>
                <TextItem path="web.home.title" isHtml />
              </div>
              <div ref={subtitleRef} className={styles('text', 'white', 'text-center')}>
                <TextItem path="web.home.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('image_wrapper')}>
            <div className={styles('ball')} ref={ballRef}>
              <Image layout="fill" src={ball} alt="smile" />
            </div>
            <div className={styles('smiley')} ref={smileyRef}>
              <Image layout="fill" src={smiley} alt="smile" />
            </div>
            <div className={styles('invisible-rainbow')} />
            <div ref={rainbowRef} className={styles('rainbow')}>
              <div>
                <Image layout="fixed" height={400} width={1200} src={rainbow} alt="smile" />
              </div>
            </div>
            <div className={styles('parkplace')} ref={startup3Ref}>
              <Image layout="fill" src={parkplace} alt="parkplace" />
            </div>
            <div className={styles('tipaw')} ref={startup5Ref}>
              <Image layout="fill" src={tipaw} alt="tipaw" />
            </div>
            <div className={styles('infamy')} ref={startup6Ref}>
              <Image layout="fill" src={infamy} alt="infamy" />
            </div>
            <div className={styles('epione')} ref={startup2Ref}>
              <Image layout="fill" src={epione} alt="epione" />
            </div>
            <div className={styles('fullup')} ref={startup1Ref}>
              <Image layout="fill" src={fullup} alt="fullup" />
            </div>
            <div className={styles('aerosint')} ref={startup4Ref}>
              <Image layout="fill" src={aerosint} alt="aerosint" />
            </div>
          </div>
        </section>

        <section className={styles('section2')} ref={Section3}>
          <Header
            noAnim
            classNameMenu={styles('black')}
            className={styles(stickyHeader && 'opacity-none')}
          />

          <div className={styles('half_round_pink')}>
            <Image layout="fill" src={halfRoundPink} alt="shape" />
          </div>
          <div className={styles('contain_wrapper')}>
            <div className={styles('section_heading')}>
              <div className={styles('title', 'black')}>
                <TextItem path="web.home.section3.title" isHtml />
              </div>
            </div>
            <div className={styles('card_wrapper')}>
              <div className={styles('card_item')}>
                <Link href="/we-invest-in-ideas">
                  <WorkerPresentation
                    className={styles('worker')}
                    picture={get(content, 'web.home.section3.cardWrapper.card_one.image.src')}
                    link
                    top={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <div className={styles('worker-top', 'white')}>
                        <TextItem path="web.home.section3.cardWrapper.card_one.title" isHtml />
                      </div>
                    }
                  >
                    <TextItem path="web.home.section3.cardWrapper.card_one.text" isHtml />
                  </WorkerPresentation>
                </Link>
              </div>

              <div className={styles('card_item')}>
                <Link href="/startup-as-a-service">
                  <WorkerPresentation
                    className={styles('worker')}
                    picture={get(content, 'web.home.section3.cardWrapper.card_two.image.src')}
                    link
                    top={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <div className={styles('worker-top', 'white')}>
                        <TextItem path="web.home.section3.cardWrapper.card_two.title" isHtml />
                      </div>
                    }
                  >
                    <TextItem path="web.home.section3.cardWrapper.card_two.text" isHtml />
                  </WorkerPresentation>
                </Link>
              </div>
              <div className={styles('card_item')}>
                <Link href="/mobile-and-web-apps-development">
                  <WorkerPresentation
                    className={styles('worker')}
                    picture={get(content, 'web.home.section3.cardWrapper.card_three.image.src')}
                    link
                    top={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <div className={styles('worker-top', 'white')}>
                        <TextItem path="web.home.section3.cardWrapper.card_three.title" isHtml />
                      </div>
                    }
                  >
                    <TextItem path="web.home.section3.cardWrapper.card_three.text" isHtml />
                  </WorkerPresentation>
                </Link>
              </div>
              <div className={styles('card_item')}>
                <Link href="/partners">
                  <WorkerPresentation
                    className={styles('worker')}
                    picture={get(content, 'web.home.section3.cardWrapper.card_four.image.src')}
                    link
                    top={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <div className={styles('worker-top', 'white')}>
                        <TextItem path="web.home.section3.cardWrapper.card_four.title" isHtml />
                      </div>
                    }
                  >
                    <TextItem path="web.home.section3.cardWrapper.card_four.text" isHtml />
                  </WorkerPresentation>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles('half_carre_yellow')}>
            <Image
              layout="fill"
              src={halfCarreYellow}
              alt="shape"
              className={styles('half_carre_yellow')}
            />
          </div>
        </section>

        <section className={styles('nine')}>
          <div className={styles('contain_wrapper')}>
            <Fade bottom>
              <div className={styles('left')}>
                <h2 className={styles('title white')}>
                  <TextItem path="staas.nine.title" />
                </h2>
                <div className={styles('text', 'second-text', 'black')}>
                  <TextItem path="staas.nine.second-text" isHtml />
                </div>
              </div>

              <div className={styles('right')}>
                <div className={styles('text', 'white')}>
                  <TextItem path="staas.nine.text" isHtml />
                </div>
              </div>
            </Fade>
          </div>
          <div className={styles('big_container')}>
            <div className={styles('box_container')}>
              <div className={styles('small_box')}>
                <div className={styles('box')}>
                  <Zoom bottom>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('1')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" src={box2} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>

                  {startupDisplay.startup_1 && (
                    <CardItem
                      className={styles('card_more_info', 'box_left')}
                      noLine
                      noPadding
                      title="ParkPlace "
                      mobileCross
                      action={() => hideStartupBox('1')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_parkplace.box_1_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'dark_blue_tag')}>
                            <TextItem path="staas.nine.box_tags.ecommerce_tag" />
                          </div>
                          <div className={styles('tag', 'blue_tag')}>
                            <TextItem path="staas.nine.box_tags.mobileapp_tag" />
                          </div>
                          <div className={styles('tag', 'pink_tag')}>
                            <TextItem path="staas.nine.box_tags.webapp_tag" />
                          </div>
                          <div className={styles('tag', 'yellow_tag')}>
                            <TextItem path="staas.nine.box_tags.ai_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_parkplace.box_1_text" />
                      </div>
                      <div className={styles('button')}>
                        <a
                          href="https://www.parkplaceapp.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
                <div className={styles('box')}>
                  <Zoom bottom delay={250}>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('2')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" src={box3} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>
                  {startupDisplay.startup_2 && (
                    <CardItem
                      className={styles('card_more_info', 'box_left')}
                      noLine
                      noPadding
                      title="Epione"
                      mobileCross
                      action={() => hideStartupBox('2')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_epione.box_2_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'pink_tag')}>
                            <TextItem path="staas.nine.box_tags.webapp_tag" />
                          </div>
                          <div className={styles('tag', 'blue_tag')}>
                            <TextItem path="staas.nine.box_tags.mobileapp_tag" />
                          </div>
                          <div className={styles('tag', 'green_tag')}>
                            <TextItem path="staas.nine.box_tags.datascience_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_epione.box_2_text" />
                      </div>
                      <div className={styles('button')}>
                        <a href="https://helpilepsy.com/" target="_blank" rel="noopener noreferrer">
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
                <div className={styles('box')}>
                  <Zoom bottom delay={500}>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('3')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" className={styles('startup')} src={box4} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>
                  {startupDisplay.startup_3 && (
                    <CardItem
                      className={styles('card_more_info', 'box_left')}
                      noLine
                      noPadding
                      title="FullUp"
                      mobileCross
                      action={() => hideStartupBox('3')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_fullup.box_3_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'green_tag')}>
                            <TextItem path="staas.nine.box_tags.iot_tag" />
                          </div>
                          <div className={styles('tag', 'pink_tag')}>
                            <TextItem path="staas.nine.box_tags.webapp_tag" />
                          </div>
                          <div className={styles('tag', 'blue_tag')}>
                            <TextItem path="staas.nine.box_tags.mobileapp_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_fullup.box_text_3" />
                      </div>
                      <div className={styles('button')}>
                        <a href="https://fullup.be/" target="_blank" rel="noopener noreferrer">
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
                <div className={styles('box')}>
                  <Zoom bottom delay={500}>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('4')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" className={styles('startup')} src={box5} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>

                  {startupDisplay.startup_4 && (
                    <CardItem
                      className={styles('card_more_info', 'box_right')}
                      noLine
                      noPadding
                      title="Tipaw"
                      mobileCross
                      action={() => hideStartupBox('4')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_tipaw.box_4_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'blue_tag')}>
                            <TextItem path="staas.nine.box_tags.matchmaking_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_tipaw.box_4_text" />
                      </div>
                      <div className={styles('button')}>
                        <a href="https://tipaw.com/" target="_blank" rel="noopener noreferrer">
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
                <div className={styles('box')}>
                  <Zoom bottom delay={250}>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('5')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" className={styles('startup')} src={box6} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>

                  {startupDisplay.startup_5 && (
                    <CardItem
                      className={styles('card_more_info', 'box_right')}
                      noLine
                      noPadding
                      title="Aerosint"
                      mobileCross
                      action={() => hideStartupBox('5')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_aerosint.box_5_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'green_tag')}>
                            <TextItem path="staas.nine.box_tags.deeptech_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_aerosint.box_5_text" />
                      </div>
                      <div className={styles('button')}>
                        <a href="https://aerosint.com/" target="_blank" rel="noopener noreferrer">
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
                <div className={styles('box')}>
                  <Zoom bottom>
                    <div className={styles('box_contain')} onClick={() => displayStartupBox('6')}>
                      <div className={styles('startup')}>
                        <Image layout="fill" className={styles('startup')} src={box7} alt="Illu" />
                      </div>
                    </div>
                  </Zoom>

                  {startupDisplay.startup_6 && (
                    <CardItem
                      className={styles('card_more_info', 'box_right')}
                      noLine
                      noPadding
                      title="Infamy"
                      mobileCross
                      action={() => hideStartupBox('6')}
                    >
                      <div className={styles('top_content')}>
                        <div className={styles('industry')}>
                          <TextItem path="staas.nine.box_infamy.box_6_industry" />
                        </div>
                        <div className={styles('tags')}>
                          <div className={styles('tag', 'pink_tag')}>
                            <TextItem path="staas.nine.box_tags.webapp_tag" />
                          </div>
                          <div className={styles('tag', 'blue_tag')}>
                            <TextItem path="staas.nine.box_tags.mobileapp_tag" />
                          </div>
                          <div className={styles('tag', 'green_tag')}>
                            <TextItem path="staas.nine.box_tags.datascience_tag" />
                          </div>
                        </div>
                      </div>
                      <div className={styles('text')}>
                        <TextItem path="staas.nine.box_infamy.box_6_text" />
                      </div>
                      <div className={styles('button')}>
                        <a
                          href="https://infamyfantasyesports.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TextItem path="Learn more" />
                        </a>
                      </div>
                    </CardItem>
                  )}
                </div>
              </div>
              <div className={styles('box_makeit')}>
                <Image width={630} height={370} src={box1} alt="Illu" />
              </div>
              <div className={styles('box_lines')}>
                <Image width={1045} height={541} src={boxLines} alt="Illu" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer
        FooterInfo={
          // pathname !== '/' &&
          pathname !== '/blog/thank-you-blog'
        }
        FooterCta={pathname === '/#' || pathname === '/blog'}
        latestPost={pathname === '/#' || pathname === '/the-club'}
      />
    </div>
  );
};

export default Home;
