import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import Slick from 'react-slick';
import CardItem from 'components/items/CardItem';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import ProjectInput from 'components/formItems/ProjectInput';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import { Form } from 'react-final-form';
import { Fade, Slide, Zoom } from 'react-reveal';
import { Link } from 'react-router-dom';
import { PopupText } from 'react-calendly';
import SeoHandler from 'components/global/SeoHandler';
import find from 'lodash/find';
import { reverse } from 'dns';
import styleIdentifiers from './staas.scss';

// assets
import illuSection1 from './assets/staas_section_1.png';
import illuSection3 from './assets/img_section_3.svg';
import illuShape from './assets/multiply_points.svg';
import illuShape2 from './assets/half_round.svg';
import illuShape3 from './assets/carre.svg';
import illuShape4 from './assets/round.svg';
import illuShape5 from './assets/multiply_points_cta.svg';
import illuShape6 from './assets/haldRoundGreen_2.svg';
import illuSection7 from './assets/staas_section_7.svg';
import picto1Section3 from './assets/design.svg';
import picto4Section3 from './assets/dev.svg';
import picto2Section3 from './assets/engi.svg';
import picto5Section3 from './assets/business.svg';
import picto3Section3 from './assets/entrepreneur.svg';
import picto6Section3 from './assets/marketing.svg';
import testimonialImg from './assets/hugues.png';
import testimonialStar from './assets/star.svg';
import testimonialIllu from './assets/testi.svg';
import box1 from './assets/makeit_box.svg';
import box2 from './assets/parkplace_box.svg';
import box3 from './assets/epione_box.svg';
import box4 from './assets/fullup_box.svg';
import box5 from './assets/tipaw_box.svg';
import box6 from './assets/aerosint_box.svg';
import box7 from './assets/infamy_box.svg';
import boxLines from './assets/half_dash_round.svg';
import pinkPoint from './assets/pink_point.svg';
import greenPoint from './assets/green_point.svg';
import expendBtn from './assets/expend_btn.svg';
import btnIcon from './assets/btn_icon.svg';
import leftArrow from './assets/leftArrow.svg';
import rightArrow from './assets/rightArrow.svg';
import cardSlider1 from './assets/cardSlider1.png';
import imgSection4 from './assets/staas_section4_img.png';
import one from './assets/one.svg';
import two from './assets/two.svg';
import three from './assets/three.svg';
import four from './assets/four.svg';
import five from './assets/five.svg';
import six from './assets/six.svg';
import seven from './assets/seven.svg';
import eight from './assets/eight.svg';
import pinkLine from './assets/pink_line.svg';
import focus from './assets/focus.svg';
import warningIcon from './assets/pazope.svg';
import smileyIllu from './assets/smiley_illu.png';

if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick.css');
if (__BROWSER__) require('!style-loader!css-loader!slick-carousel/slick/slick-theme.css');

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type StaasProps = StateProps & DispatchProps & OwnProps;

const StaasFormulaire = CustomMarketingForm(ProjectInput, CustomButton);

// const SampleNextArrow = props => {
//
//   const { className, style, onClick, currentSlide, customNav } = props;
//   return (
//     <>
//       {((customNav && currentSlide !== 4) || !customNav) && (
//         <div className={styles('right_arrow')} onClick={onClick}>
//           <img src={rightArrow} alt="Illu" />
//         </div>
//       )}
//     </>
//   );
// };

// const SamplePrevArrow = props => {
//   const { className, style, onClick, currentSlide, customNav } = props;
//   return (
//     <>
//       {((customNav && currentSlide !== 0) || !customNav) && (
//         <div className={styles('left_arrow')} onClick={onClick}>
//           <img src={leftArrow} alt="Illu" />
//         </div>
//       )}
//     </>
//   );
// };

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

const NextArrow = props => {
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

const Staas = (props: StaasProps) => {
  const { dialogShow, dialogHide, history } = props;
  const [startupDisplay, setStartupDisplay] = useState({});
  const formSection = useRef();
  const secondSection = useRef();
  const illu2 = useRef();
  const [intoView, setIntoView] = useState([]);
  const test = useRef();

  const [toggleActive, setToggleActive] = useState(1);

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

  const successForm = () => {
    history.push('/thank-you-staas');
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

  const showMoreInfosTesti = cmsPath => {
    dialogShow({
      id: 'custom',
      large: true,
      wrapperClassName: 'modal-menu',
      children: (
        <CardItem
          className={styles('modal-menu-card')}
          noLine
          noPadding
          title="Hugues, business angel, launched his startup with us"
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
    nextArrow: <NextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow customNav />,
    prevArrow: <SamplePrevArrow customNav />,
    responsive: [
      {
        breakpoint: 480, // mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrowMobile customNav />,
          prevArrow: <SamplePrevArrowMobile customNav />,
        },
      },

      {
        breakpoint: 720, // tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrowMobile customNav />,
          prevArrow: <SamplePrevArrowMobile customNav />,
        },
      },
    ],
  };

  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow3 />,
    prevArrow: <PrevArrow3 />,
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
    <div className={styles('Staas')}>
      <SeoHandler path="staas.seo" />
      <section className={styles('first')}>
        <div className={styles('container')}>
          <Fade bottom>
            <div className={styles('section_heading')}>
              <hr className={styles('line')} />
              <div className={styles('uppertitle', 'black')}>
                <TextItem path="staas.first.uppertitle" isHtml />
              </div>
              <div className={styles('title', 'white')}>
                <TextItem path="staas.first.title" isHtml />
                <img className={styles('focus_title')} src={focus} alt="focus" />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem path="staas.first.text" isHtml />
              </div>
              <CustomButton
                className={styles('button', 'button_icon')}
                action={(): void => {
                  scrollTo(secondSection);
                }}
                color="red"
                label="staas.first.button"
                id="staas-section1"
              />
            </div>
          </Fade>
          <img className={styles('Illu')} src={illuSection1} alt="Illu" />
          <img className={styles('Illu_shape')} src={illuShape} alt="Illu" />
        </div>
      </section>

      <section className={styles('second')} ref={secondSection}>
        <img className={styles('Illu_shape_2')} src={illuShape2} alt="Illu" ref={illu2} />
        <Fade bottom>
          <div className={styles('container')}>
            <div className={styles('section_heading')}>
              <h2 className={styles('title')}>
                <TextItem path="staas.second.title" />
              </h2>
              <div className={styles('text')}>
                <TextItem path="staas.second.text" />
              </div>
              <div className={styles('text')}>
                <TextItem path="staas.second.second_text" isHtml />
              </div>
            </div>
          </div>
        </Fade>
        <img className={styles('Illu_shape_3')} src={illuShape3} alt="Illu" />
      </section>

      <section className={styles('four')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <div className={styles('image_wrapper')}>
              <img className={styles('img_section_4')} src={imgSection4} alt="Illu" />
            </div>
          </div>

          <div className={styles('right')}>
            <h2 className={styles('title white')}>
              <TextItem path="staas.four.title" />
            </h2>
            <div className={styles('text', 'white')}>
              <TextItem path="staas.four.text" isHtml />
            </div>
          </div>
        </div>
        <div className={styles('big_container')}>
          <div className={styles('title', 'white', 'text-center')}>
            <TextItem path="staas.four.second_title" isHtml />
          </div>
          <div className={styles('card_slider')}>
            <Slick className={styles('card_slider_wrapper')} {...settings2}>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={one} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_1.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_1.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom delay={500}>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={two} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_2.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_2.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom delay={1000}>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={three} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_3.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_3.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={four} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_4.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_4.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={five} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_5.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_5.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={six} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_6.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_6.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={seven} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_7.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_7.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div className={styles('card_item')}>
                  <div className={styles('card_icon')}>
                    <img className={styles('card_icon')} src={eight} alt="Illu" />
                  </div>
                  <div className={styles('card_content')}>
                    <div className={styles('title', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_8.card_title" />
                    </div>
                    <div className={styles('text', 'black')}>
                      <TextItem path="staas.four.card_slider.card_item_8.card_text" />
                    </div>
                  </div>
                </div>
              </Fade>
            </Slick>
          </div>
        </div>
      </section>

      <section className={styles('four_bottom')}>
        <img src={illuShape6} alt="Illu" className={styles('half_round_green')} />
        <div className={styles('container')}>
          <div className={styles('text', 'black', 'bottom_text')}>
            <img className={styles('Illu')} src={pinkLine} alt="Illu" />
            <TextItem path="staas.four.third_text" isHtml />
          </div>
          <div className={styles('section_heading')}>
            <div className={styles('title', 'black')}>
              <TextItem path="staas.risk_benef.title" isHtml />
            </div>
          </div>
          <div className={styles('content_wrapper')}>
            <div className={styles('title', 'black')}>
              <TextItem path="staas.risk_benef.subtitle_two" isHtml />
            </div>
            <div className={styles('content')}>
              <div className={styles('col-2')}>
                <div className={styles('number_green', 'white')}>
                  <TextItem path="staas.risk_benef.phases.phase_one.number" />
                </div>
              </div>
              <div className={styles('col-2', 'title_content')}>
                <TextItem path="staas.risk_benef.phases.phase_one.title" isHtml />
              </div>
              <div className={styles('col-8', 'text_content', 'text')}>
                <TextItem path="staas.risk_benef.phases.phase_one.text" isHtml />
                <div className={styles('second_text')}>
                  <TextItem path="staas.risk_benef.phases.phase_one.second_text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('content')}>
              <div className={styles('col-2')}>
                <div className={styles('number_blue', 'white')}>
                  <TextItem path="staas.risk_benef.phases.phase_two.number" />
                </div>
              </div>
              <div className={styles('col-2', 'title_content')}>
                <TextItem path="staas.risk_benef.phases.phase_two.title" isHtml />
              </div>
              <div className={styles('col-8', 'text_content', 'text')}>
                <TextItem path="staas.risk_benef.phases.phase_two.text" isHtml />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section classN={styles('five_bis')}>
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

      <section className={styles('five')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <h2 className={styles('title white')}>
              <TextItem path="staas.five.title" />
            </h2>
            <div className={styles('text white')}>
              <TextItem path="staas.five.text" />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem path="staas.five.second_text" />
            </div>
            <div className={styles('toggle_wrapper')}>
              <div
                className={styles('toggle_item', toggleActive === 1 && 'active')}
                onClick={() => setToggleActive(1)}
              >
                <div className={styles('toggle_button')}>
                  <div className={styles('light')} />
                  <div className={styles('text')}>
                    <TextItem path="staas.five.toggle.toggle_one.button" isHtml />
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
                    <TextItem path="staas.five.toggle.toggle_two.button" isHtml />
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
                    <TextItem path="staas.five.toggle.toggle_three.button" isHtml />
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
                    path={`staas.five.card_slider.card_item_${toggleActive}.card_full_text`}
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

      <section className={styles('six')} ref={formSection}>
        <Fade bottom>
          <div className={styles('container')}>
            <h2 className={styles('title white')}>
              <TextItem path="staas.six.title" />
            </h2>
            <div className={styles('sub_container')}>
              <div className={styles('text', 'white')}>
                <TextItem path="staas.six.text" />
              </div>
              <div className={styles('button_wrapper')}>
                <div className={styles('button', 'btn_pink')}>
                  <PopupText
                    url="https://calendly.com/bryan-bogdanic/startup-as-a-service?background_color=ffffff&text_color=000000&primary_color=f1a4ab%27%7D%29%3Breturn&month=2020-07"
                    text="Schedule a call"
                  />
                </div>
              </div>
            </div>
            <img className={styles('Illu_shape_5')} src={illuShape5} alt="Illu" />
          </div>
        </Fade>
      </section>

      <section className={styles('eight')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <h2 className={styles('title', 'white')}>
              <TextItem path="staas.eight.title" />
            </h2>
            <CustomButton
              className={styles('button', 'button_icon')}
              action={(): void => {
                scrollTo(formSection);
              }}
              color="red"
              label="staas.eight.button"
              id="staas-section1"
            />
          </div>

          <div className={styles('right')}>
            <div className={styles('testimonial')}>
              <div className={styles('testimonial_top')}>
                <div className={styles('testimonial_img')}>
                  <img className={styles('Testimonial_img')} src={testimonialImg} alt="Illu" />
                </div>
                <div className={styles('testimonial_name', 'white')}>
                  <TextItem path="staas.eight.testimonial.testi_name" />
                </div>
                <div className={styles('Testimonial_star')}>
                  <img className={styles('star')} src={testimonialStar} alt="Illu" />
                </div>
              </div>
              <div className={styles('testimonial_bottom')}>
                <div className={styles('testimonial_text')}>
                  <TextItem path="staas.eight.testimonial.testi_text" isHtml />
                </div>
                <div
                  className={styles('expend')}
                  onClick={() => {
                    showMoreInfosTesti('staas.eight.testimonial.testi_full_text');
                  }}
                >
                  <p className={styles('black')}>Expand</p>

                  <img className={styles('expend_Btn')} src={expendBtn} alt="Illu" />
                </div>
              </div>
              <img className={styles('Testimonial_illu')} src={testimonialIllu} alt="Illu" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles('nine')}>
        <div className={styles('container')}>
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
            <img className={styles('box_makeit')} src={box1} alt="Illu" />
            <img className={styles('box_lines')} src={boxLines} alt="Illu" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staas;
