import React, { useState, useEffect, useRef } from 'react';
import Slick from 'react-slick';
import { PopupText } from 'react-calendly';
import { Fade, Slide, Zoom } from 'react-reveal';
import { Link } from 'react-router-dom';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import CustomButton from 'components/items/CustomButton';
import CardItem from 'components/items/CardItem';
import find from 'lodash/find';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './software.scss';

// assets
import illuSection1 from './assets/section1.svg';
import design from './assets/design.svg';
import mvp from './assets/mvp.svg';
import mobile from './assets/mobile.svg';
import screen from './assets/screen.svg';
import front from './assets/front.svg';
import back from './assets/back.svg';
import data from './assets/data.svg';
import devops from './assets/devops.svg';
import mac from './assets/mac.svg';
import pen from './assets/pen.svg';
import dev from './assets/dev.svg';
import robot from './assets/robot.svg';
import money from './assets/money.svg';
import target from './assets/target.svg';
import methodIllu from './assets/method-illu.svg';
import smileyIllu from './assets/smiley_illu.png';
import leftArrow from './assets/leftArrow.svg';
import rightArrow from './assets/rightArrow.svg';
import illuShape5 from './assets/multiply_points_cta.svg';
import box1 from './assets/makeit_box.svg';
import box2 from './assets/parkplace_box.svg';
import box3 from './assets/epione_box.svg';
import box4 from './assets/fullup_box.svg';
import box5 from './assets/tipaw_box.svg';
import box6 from './assets/aerosint_box.svg';
import box7 from './assets/infamy_box.svg';
import boxLines from './assets/half_dash_round.svg';

if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick.css');
if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick-theme.css');

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SoftwareProps = StateProps & DispatchProps & OwnProps;

const NextArrow3 = props => {
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

const PrevArrow3 = props => {
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

const Software = (props: SoftwareProps) => {
  const [toggleActive, setToggleActive] = useState(1);
  const formSection = useRef();
  const secondSection = useRef();
  const { dialogShow, dialogHide, history } = props;
  const [startupDisplay, setStartupDisplay] = useState({});
  const [intoView, setIntoView] = useState([]);

  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow3 />,
    prevArrow: <PrevArrow3 />,
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

    const newArray = intoView.concat(array);
    setIntoView(newArray);
  };

  useEffect(() => {
    window.addEventListener('scroll', revealDeco);

    return () => {
      window.removeEventListener('scroll', revealDeco);
    };
  }, []);

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

  function scrollTo(item) {
    if (item && item.current) {
      window.scrollTo({
        top: item.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  }

  const showMoreInfos = cmsPath => {
    dialogShow({
      id: 'custom',
      large: true,
      wrapperClassName: 'modal-menu',
      children: (
        <CardItem
          className={styles('modal-menu-card')}
          noLine
          noPadding
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

  // mapStateToProps
  const content = useSelector((state: StoreState) => state.content.raw);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  return (
    <div className={styles('software')}>
      <SeoHandler path="software.seo" />
      <section className={styles('section1')}>
        <div className={styles('container')}>
          <div className={styles('left-wrapper')}>
            <div className={styles('uppertitle', 'black')}>
              <TextItem path="software.section1.uppertitle" isHtml />
            </div>
            <div className={styles('title', 'white')}>
              <TextItem path="software.section1.title" isHtml />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem path="software.section1.text" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(secondSection);
              }}
              color="red"
              label="software.section1.button"
              id="sourcing-section1"
            />
          </div>
          <div className={styles('right-wrapper')}>
            <div className={styles('image-wrapper')}>
              <img src={illuSection1} alt="illu" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles('section2')} ref={secondSection}>
        <div className={styles('container')}>
          <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
            <div className={styles('left-wrapper')}>
              <div className={styles('title', 'black')}>
                <TextItem path="software.section2.title" isHtml />
              </div>
            </div>
            <div className={styles('right-wrapper')}>
              <div className={styles('text', 'black')}>
                <TextItem path="software.section2.text" isHtml />
              </div>
            </div>
          </Flex>
          <div className={styles('card-container')}>
            <div className={styles('card-item')}>
              <div className={styles('card-image')}>
                <img src={design} alt="illu" />
              </div>
              <div className={styles('card-text', 'text', 'black')}>
                <TextItem path="software.section2.card.cardOneText" isHtml />
              </div>
            </div>
            <div className={styles('card-item')}>
              <div className={styles('card-image')}>
                <img src={mvp} alt="illu" />
              </div>
              <div className={styles('card-text', 'text', 'black')}>
                <TextItem path="software.section2.card.cardTwoText" isHtml />
              </div>
            </div>
            <div className={styles('card-item')}>
              <div className={styles('card-image')}>
                <img src={mobile} alt="illu" />
              </div>
              <div className={styles('card-text', 'text', 'black')}>
                <TextItem path="software.section2.card.cardThreeText" isHtml />
              </div>
            </div>
            <div className={styles('card-item')}>
              <div className={styles('card-image')}>
                <img src={screen} alt="illu" />
              </div>
              <div className={styles('card-text', 'text', 'black')}>
                <TextItem path="software.section2.card.cardFourText" isHtml />
              </div>
            </div>
          </div>
          <CustomButton
            className={styles('button', 'button_icon')}
            action={(): void => {
              scrollTo(formSection);
            }}
            color="red"
            label="software.section2.button"
            id="sourcing-section1"
          />
        </div>
      </section>

      <section className={styles('section3')}>
        <div className={styles('container')}>
          <div className={styles('left-wrapper')}>
            <h2 className={styles('title white')}>
              <TextItem path="software.section3.title" isHtml />
            </h2>
            <div className={styles('text white')}>
              <TextItem path="software.section3.text" isHtml />
            </div>
            <div className={styles('toggle_wrapper')}>
              <div
                className={styles('toggle_item', toggleActive === 1 && 'active')}
                onClick={() => setToggleActive(1)}
              >
                <div className={styles('toggle_button')}>
                  <div className={styles('light')} />
                  <div className={styles('text')}>
                    <TextItem path="software.section3.card.card1.title" isHtml />
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
                    <TextItem path="software.section3.card.card2.title" isHtml />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles('right-wrapper')}>
            <div className={styles('card_wrapper')}>
              <div className={styles('card_item')}>
                <div className={styles('card_text', 'text')}>
                  <TextItem path={`software.section3.card.card${toggleActive}.title`} isHtml />
                </div>
                <div className={styles('card_text', 'text')}>
                  <TextItem path={`software.section3.card.card${toggleActive}.text`} isHtml />
                </div>
                <CustomButton
                  className={styles('button', 'button_icon')}
                  action={(): void => {
                    scrollTo(formSection);
                  }}
                  color="red"
                  label={`software.section3.card.card${toggleActive}.button`}
                  id="sourcing-section1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section classN={styles('section4')}>
        <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
          <div className={styles('left-wrapper')}>
            <div className={styles('card-container')}>
              <div className={styles('card-item')}>
                <div className={styles('card-image')}>
                  <img src={front} alt="illu" />
                </div>
                <div className={styles('card-title', 'title', 'black')}>
                  <TextItem path="software.section4.card.card1.title" isHtml />
                </div>
                <div className={styles('card-text', 'text', 'black')}>
                  <TextItem path="software.section4.card.card1.text" isHtml />
                </div>
              </div>
              <div className={styles('card-item')}>
                <div className={styles('card-image')}>
                  <img src={back} alt="illu" />
                </div>
                <div className={styles('card-title', 'title', 'black')}>
                  <TextItem path="software.section4.card.card2.title" isHtml />
                </div>
                <div className={styles('card-text', 'text', 'black')}>
                  <TextItem path="software.section4.card.card2.text" isHtml />
                </div>
              </div>
              <div className={styles('card-item')}>
                <div className={styles('card-image')}>
                  <img src={data} alt="illu" />
                </div>
                <div className={styles('card-title', 'title', 'black')}>
                  <TextItem path="software.section4.card.card3.title" isHtml />
                </div>
                <div className={styles('card-text', 'text', 'black')}>
                  <TextItem path="software.section4.card.card3.text" isHtml />
                </div>
              </div>
              <div className={styles('card-item')}>
                <div className={styles('card-image')}>
                  <img src={devops} alt="illu" />
                </div>
                <div className={styles('card-title', 'title', 'black')}>
                  <TextItem path="software.section4.card.card4.title" isHtml />
                </div>
                <div className={styles('card-text', 'text', 'black')}>
                  <TextItem path="software.section4.card.card4.text" isHtml />
                </div>
              </div>
            </div>
          </div>
          <div className={styles('right-wrapper')}>
            <div className={styles('title', 'black')}>
              <TextItem path="software.section4.title" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(formSection);
              }}
              color="red"
              label="software.section4.button"
              id="sourcing-section1"
            />
            <div className={styles('image-wrapper')}>
              <img src={mac} alt="illu" />
            </div>
          </div>
        </Flex>
      </Section>
      <Section classN={styles('section5')}>
        <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
          <div className={styles('left-wrapper')}>
            <div className={styles('title', 'white')}>
              <TextItem path="software.section5.title" isHtml />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem path="software.section5.text" isHtml />
            </div>
            <div className={styles('item-wrapper')}>
              <div className={styles('item')}>
                <div className={styles('item-icon')}>
                  <img src={pen} alt="illu" />
                </div>
                <div className={styles('text', 'white', 'item-text')}>
                  <TextItem path="software.section5.items.item1.text" isHtml />
                </div>
              </div>
              <div className={styles('item')}>
                <div className={styles('item-icon')}>
                  <img src={dev} alt="illu" />
                </div>
                <div className={styles('text', 'white', 'item-text')}>
                  <TextItem path="software.section5.items.item2.text" isHtml />
                </div>
              </div>
              <div className={styles('item')}>
                <div className={styles('item-icon')}>
                  <img src={robot} alt="illu" />
                </div>
                <div className={styles('text', 'white', 'item-text')}>
                  <TextItem path="software.section5.items.item3.text" isHtml />
                </div>
              </div>
              <div className={styles('item')}>
                <div className={styles('item-icon')}>
                  <img src={money} alt="illu" />
                </div>
                <div className={styles('text', 'white', 'item-text')}>
                  <TextItem path="software.section5.items.item4.text" isHtml />
                </div>
              </div>
              <div className={styles('item')}>
                <div className={styles('item-icon')}>
                  <img src={target} alt="illu" />
                </div>
                <div className={styles('text', 'white', 'item-text')}>
                  <TextItem path="software.section5.items.item5.text" isHtml />
                </div>
              </div>
            </div>
          </div>
          <div className={styles('right-wrapper')}>
            <div className={styles('text', 'white', 'second_text')}>
              <TextItem path="software.section5.second_text" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(formSection);
              }}
              color="red"
              label="software.section5.button"
              id="sourcing-section1"
            />
          </div>
        </Flex>
      </Section>
      <Section classN={styles('section6')}>
        <div className={styles('title', 'black')}>
          <TextItem path="software.section6.title" isHtml />
        </div>
        <div className={styles('text', 'black', 'second-text')}>
          <TextItem path="software.section6.text" isHtml />
        </div>
        <Flex justify="j-space-between" align="a-top" classN={styles('wrapper')}>
          <div className={styles('left-wrapper')}>
            <div className={styles('text', 'black')}>
              <TextItem path="software.section6.second_text" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(formSection);
              }}
              color="red"
              label="software.section6.button"
              id="sourcing-section1"
            />
          </div>
          <div className={styles('right-wrapper')}>
            <div className={styles('image-wrapper')}>
              <img src={methodIllu} alt="illu" />
            </div>
          </div>
        </Flex>
      </Section>

      <Section classN={styles('section7')}>
        <div className={styles('section_heading')}>
          <div className={styles('title', 'white', 'text-center')}>
            <TextItem path="sourcing.section5.title" isHtml />
          </div>
          <div className={styles('text', 'white', 'text-center')}>
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

      <section className={styles('six')} ref={formSection}>
        <div className={styles('container')}>
          <h2 className={styles('title', 'white')}>
            <TextItem path="software.section7.title" isHtml />
          </h2>
          <div className={styles('sub_container')}>
            <div className={styles('text', 'white')}>
              <TextItem path="software.section7.text" isHtml />
            </div>
            <div className={styles('button_wrapper')}>
              <div className={styles('button', 'btn_pink')}>
                <PopupText
                  url="https://calendly.com/bryan-bogdanic/we-build-product-people-actually-use?month=2020-10"
                  text="Schedule a call"
                />
              </div>
            </div>
          </div>
          <img className={styles('Illu_shape_5')} src={illuShape5} alt="Illu" />
        </div>
      </section>

      <section className={styles('nine')}>
        <div className={styles('container')}>
          <Fade bottom>
            <div className={styles('left-wrapper')}>
              <h2 className={styles('title white')}>
                <TextItem path="staas.nine.title" />
              </h2>
              <div className={styles('text', 'second-text', 'black')}>
                <TextItem path="staas.nine.second-text" isHtml />
              </div>
            </div>

            <div className={styles('right-wrapper')}>
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
      </section>
    </div>
  );
};

export default Software;
