import React, { useState, useEffect, useRef } from 'react';
import Slick from 'react-slick';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Section from 'components/pageItems/Section';
import CustomButton from 'components/items/CustomButton';
import Flex from 'components/pageItems/Flex';
import Blurb from 'components/pageItems/Blurb';
import CardItem from 'components/items/CardItem';
import InvestCard from 'components/pageItems/InvestCard';
// import { Form } from 'react-final-form';
// import SourcingContactForm from 'components/forms/SourcingContactForm';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import ProjectInput from 'components/formItems/ProjectInput';
import { Fade, Slide, Zoom } from 'react-reveal';
import { CSSTransition } from 'react-transition-group';
import { PopupText } from 'react-calendly';
import { Link } from 'react-router-dom';
import SeoHandler from 'components/global/SeoHandler';

import styleIdentifiers from './sourcing.scss';

// assets
import ImgSection1 from './assets/imgSection1.png';
import ImgSection5 from './assets/imgSection5.svg';
import illuShape5 from './assets/multiply_points_cta.svg';
import ImgSection3 from './assets/sourcing_section3_img.png';
import cardSlider1 from './assets/cardSlider1.png';
import Step1 from './assets/step1.svg';
import Step2 from './assets/step2.svg';
import Step3 from './assets/step3.svg';
import Step4 from './assets/step4.svg';
import Step5 from './assets/step5.svg';
import Skill1 from './assets/skill1.svg';
import Skill2 from './assets/skill2.svg';
import Skill3 from './assets/skill3.svg';
import Skill4 from './assets/skill4.svg';
import Skill5 from './assets/skill5.svg';
import Skill6 from './assets/skill6.svg';
import leftArrow from './assets/leftArrow.svg';
import rightArrow from './assets/rightArrow.svg';
import DotsSection1 from './assets/dotsSection1.svg';
import imgSection3Before from './assets/imgSection3Before.svg';
import imgSection7Before from './assets/imgSection7Before.svg';
import greenPoint from './assets/greenPoint.svg';
import pinkPoint from './assets/pink_point.svg';
import badgeOne from './assets/badgeUno.svg';
import badgeTwo from './assets/badgeDos.svg';
import expandBtn from './assets/expandBtn.svg';
import box1 from './assets/makeit_box.svg';
import box2 from './assets/parkplace_box.svg';
import box3 from './assets/epione_box.svg';
import box4 from './assets/fullup_box.svg';
import box5 from './assets/tipaw_box.svg';
import box6 from './assets/aerosint_box.svg';
import box7 from './assets/infamy_box.svg';
import boxLines from './assets/half_dash_round.svg';
import illuSection7 from './assets/staas_section_7.svg';
import dashUnion from './assets/dash_union.svg';
import goalIcon from './assets/goal_icon.svg';
import moon from './assets/grey_planet.svg';
import mars from './assets/red_planet.svg';
import jupiter from './assets/green_planet.svg';
import earth from './assets/earth.svg';
import badgePink from './assets/badge_one.svg';
import badgeBlue from './assets/badge_two.svg';
import badgeYellow from './assets/badge_three.svg';
import badgeGreen from './assets/badge_four.svg';
import check from './assets/check.svg';
import star from './assets/star.svg';
import verticalLine from './assets/dash_line_vertical.svg';
import smileyIllu from './assets/smiley_illu.png';
import warningIcon from './assets/pazope.svg';
import beangels from './assets/makeitxbeangels.svg';
import unicorn from './assets/unicorn.png';

if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick.css');
if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick-theme.css');

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SourcingProps = StateProps & DispatchProps & OwnProps;

const SourcingFormulaire = CustomMarketingForm(ProjectInput, CustomButton);

const SampleNextArrowMobile = props => {
  const { className, style, onClick } = props;
  return (
    <div className={styles('right_arrow')} onClick={onClick}>
      <img src={rightArrow} alt="Illu" />
    </div>
  );
};

const SamplePrevArrowMobile = props => {
  const { className, style, onClick } = props;
  return (
    <div className={styles('left_arrow')} onClick={onClick}>
      <img src={leftArrow} alt="Illu" />
    </div>
  );
};

const SampleNextArrow = props => {
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

const SampleNextArrow3 = props => {
  const { className, style, onClick, currentSlide, customNav } = props;
  return (
    <>
      {currentSlide !== 4 && (
        <div className={styles('right_arrow')} onClick={onClick}>
          <img src={rightArrow} alt="Illu" />
        </div>
      )}
    </>
  );
};

const SamplePrevArrow3 = props => {
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

const Sourcing = (props: SourcingProps) => {
  const { content, lg } = props;
  const { dialogShow, dialogHide, history } = props;
  const [startupDisplay, setStartupDisplay] = useState({});
  const formSection = useRef();
  const secondSection = useRef();
  const skillImgArray = [Skill1, Skill2, Skill3, Skill4, Skill5, Skill6];
  const [toggleActive, setToggleActive] = useState(1);

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

  const showMoreInfos = cmsPath => {
    dialogShow({
      id: 'custom',
      large: true,
      wrapperClassName: 'modal-menu',
      children: (
        <CardItem
          className={styles('modal-menu-card')}
          noLine
          title="How we de-risk idea stage projects"
          action={() => dialogHide('custom')}
          mobileCross
        >
          <div className={styles('modal-menu-card-content')}>
            <TextItem path={cmsPath} isHtml />
          </div>
        </CardItem>
      ),
    });
  };

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
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 540, // mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrowMobile />,
          prevArrow: <SamplePrevArrowMobile />,
        },
      },

      {
        breakpoint: 780, // tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrowMobile />,
          prevArrow: <SamplePrevArrowMobile />,
        },
      },
    ],
  };

  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow3 />,
    prevArrow: <SamplePrevArrow3 />,
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
    <div className={styles('Sourcing')}>
      <SeoHandler path="sourcing.seo" />
      <Section classN={styles('section1')}>
        <div className={styles('decoration')} />
        <div className={styles('section_heading')}>
          <Slide bottom cascade duration={400}>
            <Fade bottom>
              <div className={styles('uppertitle', 'black')}>
                <TextItem path="sourcing.section1.uppertitle" isHtml />
              </div>
              <div className={styles('title', 'white')}>
                <TextItem path="sourcing.section1.title" isHtml />
              </div>

              <div className={styles('text', 'white')}>
                <TextItem path="sourcing.section1.text" isHtml />
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
            </Fade>
          </Slide>
        </div>
        <div className={styles('image_wrapper')}>
          <img src={ImgSection1} alt="" />
        </div>
      </Section>
      <div className={styles('overlap', 'overlap_img_section1')}>
        <div className={styles('image_wrapper')}>
          <div className={styles('dots')}>
            <img src={DotsSection1} alt="" />
          </div>
          <img src={ImgSection1} alt="" />
        </div>
      </div>
      <Section classN={styles('section2')} forwardRef={secondSection}>
        <div className={styles('section_heading')}>
          <Slide bottom cascade duration={400}>
            <Fade bottom>
              <div className={styles('title', 'black')}>
                <TextItem path="sourcing.section2.title" isHtml />
              </div>
              <div className={styles('text', 'black')}>
                <TextItem path="sourcing.section2.text" isHtml />
              </div>
              <div className={styles('text', 'black')}>
                <TextItem path="sourcing.section2.second_text" isHtml />
              </div>
              <CustomButton
                className={styles('button', 'button_icon')}
                action={(): void => {
                  scrollTo(formSection);
                }}
                color="red"
                label="sourcing.section2.button"
                id="sourcing-section2"
              />
            </Fade>
          </Slide>
        </div>
      </Section>
      <section className={styles('section3')}>
        <div className={styles('section3_before')}>
          <img src={imgSection3Before} alt="" />
        </div>

        <div className={styles('section_heading')}>
          <div className={styles('col', 'col-lg-6', 'left')}>
            <div className={styles('image_wrapper')}>
              <img className={styles('img_section_4')} src={ImgSection3} alt="Illu" />
            </div>
          </div>

          <div className={styles('col', 'col-lg-6', 'right')}>
            <div className={styles('title', 'white')}>
              <TextItem path="sourcing.section3.title" isHtml />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem path="sourcing.section3.text" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(formSection);
              }}
              color="red"
              label="sourcing.section3.button"
              id="staas-section1"
            />
          </div>
        </div>

        <div className={styles('big_container')}>
          <div className={styles('title', 'white', 'text-center')}>
            <TextItem path="sourcing.section3.second_title" isHtml />
          </div>
          <div className={styles('card_slider')}>
            <Slick className={styles('card_slider_wrapper')} {...settings2}>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={Step1} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="sourcing.section3.steps.step1.title" isHtml />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section3.steps.step1.text" isHtml />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom delay={500}>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={Step2} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="sourcing.section3.steps.step2.title" isHtml />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section3.steps.step2.text" isHtml />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom delay={1000}>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={Step3} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="sourcing.section3.steps.step3.title" isHtml />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section3.steps.step3.text" isHtml />
                    </div>
                  </div>
                </div>
              </Fade>

              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={Step4} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="sourcing.section3.steps.step4.title" isHtml />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section3.steps.step4.text" isHtml />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={Step5} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="sourcing.section3.steps.step5.title" isHtml />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section3.steps.step5.text" isHtml />
                    </div>
                  </div>
                </div>
              </Fade>
            </Slick>
          </div>
        </div>
      </section>

      <section className={styles('section3_bis')}>
        <div className={styles('contain_wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('section_heading')}>
              <div className={styles('title', 'black')}>
                <TextItem path="sourcing.section3_bis.title" isHtml />
              </div>
              <div className={styles('text', 'black')}>
                <TextItem path="sourcing.section3_bis.text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <div className={styles('text', 'white')}>
              <img className={styles('icon')} src={goalIcon} alt="Illu" />
              <TextItem path="sourcing.section3_bis.second_text" isHtml />
            </div>
          </div>
        </div>
      </section>

      <Section classN={styles('section4')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'black', 'text-center')}>
            <TextItem path="sourcing.section4.title" isHtml />
          </div>
          <div className={styles('text', 'uppertext', 'text-center', 'white')}>
            <TextItem path="sourcing.section4.text" isHtml />
          </div>
        </div>
        <div className={styles('image_wrapper')}>
          <img src={dashUnion} alt="Illu" />
        </div>
        <div className={styles('blurb_wrapper')}>
          <div className={styles('blurb')}>
            <div className={styles('black', 'second_text')}>
              <img className={styles('color_point')} src={pinkPoint} alt="Illu" />
              <TextItem path="sourcing.section4.blurbs.blurb1" isHtml />
            </div>
          </div>
          <div className={styles('blurb')}>
            <div className={styles('second_text', 'black')}>
              <img className={styles('color_point')} src={greenPoint} alt="Illu" />
              <TextItem path="sourcing.section4.blurbs.blurb2" isHtml />
            </div>
          </div>
        </div>
        <img className={styles('unicorn')} src={unicorn} alt="unicorn" />
      </Section>

      <Section classN={styles('section5_bis')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'white', 'text-center')}>
            <TextItem path="sourcing.section5_bis.title" isHtml />
          </div>
        </div>
        <div className={styles('card_wrapper')}>
          <div className={styles('card')}>
            <div className={styles('card_icon')}>
              <img className={styles('icon')} src={jupiter} alt="Illu" />
            </div>
            <div className={styles('card_text', 'text-center')}>
              <TextItem path="sourcing.section5_bis.cards.card_one.text" isHtml />
            </div>
          </div>
          <div className={styles('card')}>
            <div className={styles('card_icon')}>
              <img className={styles('icon')} src={mars} alt="Illu" />
            </div>
            <div className={styles('card_text', 'text-center')}>
              <TextItem path="sourcing.section5_bis.cards.card_two.text" isHtml />
            </div>
          </div>
          <div className={styles('card')}>
            <div className={styles('card_icon')}>
              <img className={styles('icon')} src={moon} alt="Illu" />
            </div>
            <div className={styles('card_text', 'text-center')}>
              <TextItem path="sourcing.section5_bis.cards.card_three.text" isHtml />
            </div>
          </div>
          <div className={styles('card')}>
            <div className={styles('card_icon')}>
              <img className={styles('icon')} src={earth} alt="Illu" />
            </div>
            <div className={styles('card_text', 'text-center')}>
              <TextItem path="sourcing.section5_bis.cards.card_four.text" isHtml />
            </div>
          </div>
          <img className={styles('vertical_line')} src={verticalLine} alt="Illu" />
        </div>

        <div className={styles('text', 'text-center', 'second_text', 'conclusion_card')}>
          <img className={styles('icon')} src={check} alt="Illu" />
          <TextItem path="sourcing.section5_bis.text" isHtml />
        </div>

        {/* <div className={styles('blurbs_wrapper')}>
          <div className={styles('blurb', 'blurb_four')}>
            <div className={styles('blurb_icon')}>
              <img className={styles('icon')} src={badgePink} alt="Illu" />
            </div>
            <div className={styles('blurb_text')}>
              <TextItem path="sourcing.section5_bis.blurb_one.text" isHtml />
            </div>
          </div>
          <div className={styles('blurb', 'blurb_four')}>
            <div className={styles('blurb_icon')}>
              <img className={styles('icon')} src={badgeBlue} alt="Illu" />
            </div>
            <div className={styles('blurb_text')}>
              <TextItem path="sourcing.section5_bis.blurb_two.text" isHtml />
            </div>
          </div>
          <div className={styles('blurb', 'blurb_four')}>
            <div className={styles('blurb_icon')}>
              <img className={styles('icon')} src={badgeYellow} alt="Illu" />
            </div>
            <div className={styles('blurb_text')}>
              <TextItem path="sourcing.section5_bis.blurb_three.text" isHtml />
            </div>
          </div>
          <div className={styles('blurb', 'blurb_four')}>
            <div className={styles('blurb_icon')}>
              <img className={styles('icon')} src={badgeGreen} alt="Illu" />
            </div>
            <div className={styles('blurb_text')}>
              <TextItem path="sourcing.section5_bis.blurb_four.text" isHtml />
            </div>
          </div>
        </div>

        <div className={styles('text', 'text-center', 'second_text')}>
          <img className={styles('pink_point')} src={pinkPoint} alt="Illu" />
          <TextItem path="sourcing.section5_bis.second_text" isHtml />
        </div> */}
        <a
          href="/we-invest-in-ideas-application"
          rel="noopener noreferrer"
          className={styles('button')}
        >
          <CustomButton
            className={styles('button', 'button_icon')}
            color="red"
            label="Apply now"
            id="staas-section1"
          />
        </a>
      </Section>

      <Section classN={styles('section5')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'black', 'text-center')}>
            <TextItem path="sourcing.section5.title" isHtml />
          </div>
          <div className={styles('text', 'black', 'text-center')}>
            <TextItem path="sourcing.section5.text" isHtml />
          </div>
        </div>
        <Flex justify="j-space-between" align="a-center" classN={styles('wrapper')}>
          <div className={styles('left_wrapper', 'flex_img_wrapper')}>
            <div className={styles('image_wrapper')}>
              <img src={smileyIllu} alt="" />
            </div>
          </div>
          <div className={styles('right_wrapper', 'flex_content_wrapper')}>
            <div className={styles('card_slider')}>
              <Slick className={styles('card_slider_wrapper')} {...settings3}>
                <div className={styles('card_item')}>
                  <div className={styles('card_number')}>
                    <TextItem path="sourcing.section5.numbers.number_one.number" isHtml />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section5.numbers.number_one.text" isHtml />
                    </div>
                  </div>
                </div>
                <div className={styles('card_item')}>
                  <div className={styles('card_number')}>
                    <TextItem path="sourcing.section5.numbers.number_two.number" isHtml />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section5.numbers.number_two.text" isHtml />
                    </div>
                  </div>
                </div>
                <div className={styles('card_item')}>
                  <div className={styles('card_number')}>
                    <TextItem path="sourcing.section5.numbers.number_three.number" isHtml />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section5.numbers.number_three.text" isHtml />
                    </div>
                  </div>
                </div>
                <div className={styles('card_item')}>
                  <div className={styles('card_number')}>
                    <TextItem path="sourcing.section5.numbers.number_four.number" isHtml />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section5.numbers.number_four.text" isHtml />
                    </div>
                  </div>
                </div>
                <div className={styles('card_item')}>
                  <div className={styles('card_number')}>
                    <TextItem path="sourcing.section5.numbers.number_five.number" isHtml />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('text', 'black')}>
                      <TextItem path="sourcing.section5.numbers.number_five.text" isHtml />
                    </div>
                  </div>
                </div>
              </Slick>
            </div>
          </div>
        </Flex>
      </Section>

      <section className={styles('section6')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <h2 className={styles('title white')}>
              <TextItem path="sourcing.section6.title" isHtml />
            </h2>
            <div className={styles('text', 'white')}>
              <TextItem path="sourcing.section6.text" isHtml />
            </div>

            <div className={styles('toggle_wrapper')}>
              <div
                className={styles('toggle_item', toggleActive === 1 && 'active')}
                onClick={() => setToggleActive(1)}
              >
                <div className={styles('toggle_button')}>
                  <div className={styles('light')} />
                  <div className={styles('text')}>
                    <TextItem path="sourcing.section6.toggle.toggle_one.button" isHtml />
                  </div>
                </div>
              </div>
              <div
                className={styles('toggle_item', toggleActive === 2 && 'active')}
                onClick={() => setToggleActive(2)}
              >
                <div className={styles('toggle_button')}>
                  <div className={styles('light')} />
                  <div className={styles('text')}>
                    <TextItem path="sourcing.section6.toggle.toggle_two.button" isHtml />
                  </div>
                </div>
              </div>
              <div
                className={styles('toggle_item', toggleActive === 3 && 'active')}
                onClick={() => setToggleActive(3)}
              >
                <div className={styles('toggle_button')}>
                  <div className={styles('light')} />
                  <div className={styles('text')}>
                    <TextItem path="sourcing.section6.toggle.toggle_three.button" isHtml />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles('right')}>
            <div className={styles('card_wrapper')}>
              <div className={styles('card_item')}>
                <div className={styles('card_image')}>
                  <img className={styles('card_img')} src={cardSlider1} alt="Illu" />
                </div>
                <div className={styles('card_text', 'text')}>
                  <TextItem
                    path={`sourcing.section6.card_slider.card_item_${toggleActive}.card_full_text`}
                    isHtml
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles('sub_container')}>
          <div className={styles('cta_wrapper')}>
            <div className={styles('icon_wrapper')}>
              <img className={styles('warning_icon')} src={warningIcon} alt="Illu" />
            </div>
            <div className={styles('text', 'black')}>
              <TextItem path="staas.five.cta.text" isHtml />
            </div>
            <div className={styles('btn_container')}>
              <a
                href="/blog/how-to-test-a-startup-idea-parkplace"
                rel="noopener noreferrer"
                className={styles('button')}
              >
                <CustomButton
                  className={styles('button', 'button_icon')}
                  color="red"
                  label="staas.five.cta.button"
                  id="left-section6"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section classN={styles('section7')} forwardRef={formSection}>
        <div className={styles('container')}>
          <div className={styles('title', 'white')}>
            <TextItem path="sourcing.section7.title" isHtml />
          </div>
          <div className={styles('sub_container')}>
            <div className={styles('text', 'white')}>
              <TextItem path="sourcing.section7.text" isHtml />
            </div>
            <div className={styles('btn_container')}>
              <a
                href="/we-invest-in-ideas-application"
                rel="noopener noreferrer"
                className={styles('button')}
              >
                <CustomButton
                  className={styles('button', 'button_icon')}
                  color="red"
                  label="Apply now"
                  id="left-section6"
                />
              </a>
            </div>
          </div>
          <img className={styles('Illu_shape_5')} src={illuShape5} alt="Illu" />
        </div>
      </Section>

      <Section classN={styles('section2_bis')}>
        <Flex justify="j-space-between" align="a-center" classN={styles('wrapper')}>
          <div className={styles('left')}>
            <div className={styles('title', 'white')}>
              <TextItem path="sourcing.section2_bis.title" isHtml />
            </div>
          </div>
          <div className={styles('right')}>
            <div className={styles('image_wrapper')}>
              <img src={beangels} alt="makeitxbeangels" />
            </div>
          </div>
        </Flex>
      </Section>

      <Section classN={styles('section8')}>
        <div className={styles('container')}>
          <Fade bottom>
            <div className={styles('left')}>
              <h2 className={styles('title', 'white')}>
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
                    <img className={styles('startup')} src={box2} alt="Illu" />
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
                      <a href="https://www.parkplaceapp.io/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
              <div className={styles('box')}>
                <Zoom bottom delay={250}>
                  <div className={styles('box_contain')} onClick={() => displayStartupBox('2')}>
                    <img className={styles('startup')} src={box3} alt="Illu" />
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
                      <a href="https://helpilepsy.com/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
              <div className={styles('box')}>
                <Zoom bottom delay={500}>
                  <div className={styles('box_contain')} onClick={() => displayStartupBox('3')}>
                    <img className={styles('startup')} src={box4} alt="Illu" />
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
                      <a href="https://fullup.be/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
              <div className={styles('box')}>
                <Zoom bottom delay={500}>
                  <div className={styles('box_contain')} onClick={() => displayStartupBox('4')}>
                    <img className={styles('startup')} src={box5} alt="Illu" />
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
                      <a href="https://tipaw.com/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
              <div className={styles('box')}>
                <Zoom bottom delay={250}>
                  <div className={styles('box_contain')} onClick={() => displayStartupBox('5')}>
                    <img className={styles('startup')} src={box6} alt="Illu" />
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
                      <a href="https://aerosint.com/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
              <div className={styles('box')}>
                <Zoom bottom>
                  <div className={styles('box_contain')} onClick={() => displayStartupBox('6')}>
                    <img className={styles('startup')} src={box7} alt="Illu" />
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
                      <a href="https://infamyfantasyesports.com/" target="_blank">
                        <TextItem path="Learn more" />
                      </a>
                    </div>
                  </CardItem>
                )}
              </div>
            </div>
            <img className={styles('box_makeit')} src={box1} alt="Illu" />
            <img className={styles('box_lines')} src={boxLines} alt="Illu" />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Sourcing;
