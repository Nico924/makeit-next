import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Section from 'components/pageItems/Section';
import CustomButton from 'components/items/CustomButton';
import Flex from 'components/pageItems/Flex';
import Slick from 'react-slick';
import { PopupText } from 'react-calendly';
import { scroller } from 'react-scroll';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './about.scss';
// assets
import halfRound from './assets/half_round.svg';
import halfCarre from './assets/half_carre.svg';
import startupLeft from './assets/startup_header_left.svg';
import startupRight from './assets/startup_header_right.svg';
import founderIllu from './assets/about_section2.svg';
import greenPoint from './assets/greenPoint.svg';
import pinkPoint from './assets/pink_point.svg';
import pacMan from './assets/level100.png';
import timeline from './assets/timeline.svg';
import infoIcon from './assets/infos.svg';
import epioneBox from './assets/epione-box.svg';
import fullupBox from './assets/fullup-box.svg';
import tipawBox from './assets/tipaw-box.svg';
import aerosintBox from './assets/aero-box.svg';
import lineDashed from './assets/line_dashed.svg';
import leftArrow from './assets/leftArrow.svg';
import rightArrow from './assets/rightArrow.svg';
import oneIcon from './assets/one.svg';
import twoIcon from './assets/two.svg';
import threeIcon from './assets/three.svg';
import fourIcon from './assets/four.svg';
import fiveIcon from './assets/five.svg';
import sixIcon from './assets/six.svg';
import multiplePointGreen from './assets/multiply_point.svg';
import trump from './assets/trump.svg';
import cloud from './assets/cloud.svg';
import unicorn from './assets/unicorn.png';
import atomium from './assets/atomium.svg';
import check from './assets/check.svg';
import mars from './assets/red_planet.svg';
import moon from './assets/grey_planet.svg';
import earth from './assets/earth.svg';
import star from './assets/star.svg';
import jupiter from './assets/green_planet.svg';
import verticalLine from './assets/vertical_line_dashed.svg';
import bluePoint from './assets/blue_point.svg';
import momTatoo from './assets/mom.png';
import impact from './assets/impact.svg';
import startup from './assets/startups.svg';
import valuable from './assets/valuable.svg';
import society from './assets/society.svg';
import robot from './assets/robot.svg';
import world from './assets/world.svg';
import duffMan from './assets/duff_man.svg';
import flowerMoney from './assets/flower_money.svg';
import alert from './assets/alert.svg';
import builder from './assets/builder.png';
import iphone from './assets/iphone.svg';
import nextArrow from './assets/nextArrow.svg';
import prevArrow from './assets/prevArrow.svg';
import sanou from './assets/sanou.png';
import alex from './assets/alex.png';
import nico from './assets/nico.png';
import bryan from './assets/bryan.png';
import tom from './assets/tom.png';
import had from './assets/had.png';
import audrey from './assets/audrey.png';
import richi from './assets/richi.png';
import tp from './assets/tp.png';
import david from './assets/david.png';
import seb from './assets/seb.png';
import fanny from './assets/fanny.png';

// slick
if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick.css');
if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick-theme.css');

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type AboutProps = StateProps & DispatchProps & OwnProps;

const SampleNextArrow = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 5 && (
        <div className={styles('right_arrow')} onClick={onClick}>
          <img src={rightArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SamplePrevArrow = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 0 && (
        <div className={styles('left_arrow')} onClick={onClick}>
          <img src={leftArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SampleNextArrow2 = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 2 && (
        <div className={styles('right_arrow')} onClick={onClick}>
          <img src={rightArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SamplePrevArrow2 = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 0 && (
        <div className={styles('left_arrow')} onClick={onClick}>
          <img src={leftArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SampleNextArrow2Mobile = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 5 && (
        <div className={styles('right_arrow')} onClick={onClick}>
          <img src={rightArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SamplePrevArrow2Mobile = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 0 && (
        <div className={styles('left_arrow')} onClick={onClick}>
          <img src={leftArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SampleNextArrowIphone = props => {
  const { className, style, onClick } = props;
  return (
    <div className={styles('next_arrow')} onClick={onClick}>
      <img src={nextArrow} alt="Illu" />
    </div>
  );
};

const SamplePrevArrowIphone = props => {
  const { className, style, onClick } = props;
  return (
    <div className={styles('prev_arrow')} onClick={onClick}>
      <img src={prevArrow} alt="Illu" />
    </div>
  );
};

const About = (props: AboutProps) => {
  const { history } = props;
  const secondSection = useRef();
  const [toggleActive, setToggleActive] = useState(1);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow2 />,
    prevArrow: <SamplePrevArrow2 />,
    responsive: [
      {
        breakpoint: 480, // mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow2Mobile />,
          prevArrow: <SamplePrevArrow2Mobile />,
        },
      },

      {
        breakpoint: 720, // tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow2Mobile />,
          prevArrow: <SamplePrevArrow2Mobile />,
        },
      },
    ],
  };

  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrowIphone />,
    prevArrow: <SamplePrevArrowIphone />,
  };

  function scrollTo(item) {
    if (item && item.current) {
      window.scrollTo({
        top: item.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className={styles('About')}>
      <SeoHandler path="about.seo" />
      <section className={styles('section1')}>
        <img src={startupLeft} alt="" className={styles('startup_left')} />
        <img src={halfCarre} alt="" className={styles('half_carre')} />
        <div className={styles('contain_wrapper')}>
          <div className={styles('section_heading')}>
            <div className={styles('uppertitle', 'black')}>
              <TextItem path="about.section1.Uppertitle" isHtml />
            </div>
            <div className={styles('title', 'white')}>
              <TextItem path="about.section1.Title" isHtml />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem path="about.section1.Text" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(secondSection);
              }}
              color="red"
              label="sourcing.section1.button"
              id="sourcing-section1"
            />
          </div>
        </div>
        <img src={startupRight} alt="" className={styles('startup_right')} />
        <img src={halfRound} alt="" className={styles('half_round')} />
      </section>

      <Section classN={styles('section8')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'white')}>
            <TextItem path="about.section8.title" isHtml />
          </div>
          <div className={styles('text', 'white')}>
            <TextItem path="about.section8.text" isHtml />
          </div>
          <div className={styles('text', 'black', 'second_text')}>
            <img src={bluePoint} alt="" className={styles('point')} />
            <TextItem path="about.section8.second_text" isHtml />
          </div>
        </div>
        <div className={styles('slider_wrapper')}>
          <Slick className={styles('slider_wrapper')} {...settings2}>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={impact} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_one.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={valuable} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_two.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={startup} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_three.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={society} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_four.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={robot} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_five.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('slider_item')}>
              <div className={styles('slider_icon')}>
                <img src={world} alt="" className={styles('icon')} />
              </div>
              <div className={styles('slider_text')}>
                <div className={styles('text', 'black')}>
                  <TextItem path="about.section8.slider.slider_six.text" isHtml />
                </div>
              </div>
            </div>
          </Slick>
        </div>
        <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('text', 'white', 'text_block')}>
              <TextItem path="about.section8.block_text" isHtml />
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <div className={styles('image_wrapper')}>
              <img src={momTatoo} alt="" className={styles('momTatoo')} />
            </div>
          </div>
        </Flex>
      </Section>

      <Section classN={styles('section2')} forwardRef={secondSection}>
        <Flex justify="j-space-between" align="a-center" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('image_wrapper')}>
              <img src={founderIllu} alt="" className={styles('founder_illu')} />
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <div className={styles('title', 'black')}>
              <TextItem path="about.section2.title" isHtml />
            </div>
            <div className={styles('text', 'black')}>
              <TextItem path="about.section2.text" isHtml />
            </div>
          </div>
        </Flex>
      </Section>

      <Section classN={styles('section3')}>
        <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('title', 'white')}>
              <TextItem path="about.section3.title" isHtml />
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <div className={styles('text', 'white')}>
              <TextItem path="about.section3.text" isHtml />
            </div>
          </div>
        </Flex>
      </Section>

      <section className={styles('big_wrapper')}>
        <div className={styles('image_wrapper')}>
          <img src={pacMan} alt="" className={styles('pacman')} />
        </div>
      </section>

      <Section classN={styles('section5')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'black')}>
            <TextItem path="about.section5.title" isHtml />
          </div>
        </div>
        <Slick className={styles('slider_wrapper')} {...settings}>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={oneIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_one.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={twoIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_two.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={threeIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_three.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={fourIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_four.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={fiveIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_five.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('slider_item')}>
            <div className={styles('slider_icon')}>
              <img src={sixIcon} alt="" className={styles('number_icon')} />
            </div>
            <div className={styles('slider_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section5.slider.slider_six.text" isHtml />
              </div>
            </div>
          </div>
        </Slick>
      </Section>

      <Section classN={styles('section6')}>
        <Flex justify="j-space-between" align="a-end" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <img src={cloud} alt="" className={styles('cloud')} />
            <div className={styles('section_heading')}>
              <div className={styles('title', 'white')}>
                <TextItem path="about.section6.title" isHtml />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem path="about.section6.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <img src={unicorn} alt="" className={styles('unicorn')} />
            <div className={styles('text', 'white', 'text_block')}>
              <TextItem path="about.section6.second_text" isHtml />
            </div>
          </div>
        </Flex>
      </Section>

      <section className={styles('big_wrapper_4')}>
        <div className={styles('image_wrapper')}>
          <img src={atomium} alt="" className={styles('atomium')} />
        </div>
      </section>

      <Section classN={styles('section10')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'white')}>
            <TextItem path="about.section10.title" isHtml />
          </div>
          <div className={styles('text', 'black', 'second_text')}>
            <img src={greenPoint} alt="" className={styles('point')} />
            <TextItem path="about.section10.text" isHtml />
          </div>
          <div className={styles('wrapper')}>
            <div className={styles('left_wrapper')}>
              <div className={styles('text', 'white')}>
                <TextItem path="about.section10.second_text" isHtml />
              </div>
            </div>
            <div className={styles('right_wrapper')}>
              <div className={styles('text', 'white')}>
                <TextItem path="about.section10.third_text" isHtml />
              </div>
            </div>
          </div>
        </div>
        <div className={styles('heading')}>
          <div className={styles('title', 'white', 'text-center')}>
            <TextItem path="about.section10.second_title" isHtml />
          </div>
        </div>
        <div className={styles('card_wrapper')}>
          <div className={styles('card_item')}>
            <div className={styles('card_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section10.card.card_one" isHtml />
              </div>
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                history.push('/we-invest-in-ideas');
              }}
              color="red"
              label="Get started"
              id="sourcing-section1"
            />
          </div>
          <div className={styles('card_item')}>
            <div className={styles('card_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section10.card.card_two" isHtml />
              </div>
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                history.push('/we-invest-in-ideas');
              }}
              color="red"
              label="Get started"
              id="sourcing-section1"
            />
          </div>
          <div className={styles('card_item')}>
            <div className={styles('card_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section10.card.card_three" isHtml />
              </div>
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                history.push('/partners');
              }}
              color="red"
              label="Get started"
              id="sourcing-section1"
            />
          </div>
          <div className={styles('card_item')}>
            <div className={styles('card_text')}>
              <div className={styles('text', 'black')}>
                <TextItem path="about.section10.card.card_four" isHtml />
              </div>
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                history.push('/partners');
              }}
              color="red"
              label="Get started"
              id="sourcing-section1"
            />
          </div>
        </div>
      </Section>

      <Section classN={styles('section11')}>
        <Flex justify="j-space-between" align="a-center" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('title', 'black')}>
              <TextItem path="about.section11.title" isHtml />
            </div>
            <div className={styles('image_wrapper')}>
              <img src={builder} alt="" className={styles('builder')} />
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <img src={iphone} alt="" className={styles('iphone')} />

            <Slick className={styles('slider_wrapper')} {...settings3}>
              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={sanou} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.sanou.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.sanou.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={alex} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.alex.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.alex.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={nico} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.nico.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.nico.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={bryan} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.bryan.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.bryan.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={tom} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.tom.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.tom.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={had} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.had.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.had.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={audrey} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.audrey.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.audrey.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={fanny} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.fanny.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.fanny.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={richi} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.richi.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.richi.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={tp} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.tp.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.tp.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={david} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.david.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.david.function" isHtml />
                  </div>
                </div>
              </div>

              <div className={styles('slider_item')}>
                <div className={styles('slider_image')}>
                  <img src={seb} alt="" className={styles('img')} />
                </div>
                <div className={styles('slider_content')}>
                  <div className={styles('title', 'white')}>
                    <TextItem path="about.section11.team.seb.name" isHtml />
                  </div>
                  <div className={styles('text', 'white')}>
                    <TextItem path="about.section11.team.seb.function" isHtml />
                  </div>
                </div>
              </div>
            </Slick>
          </div>
        </Flex>
      </Section>
    </div>
  );
};

export default About;
