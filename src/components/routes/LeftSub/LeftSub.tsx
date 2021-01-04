import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import NewsLetterForm from 'components/forms/NewsLetterForm';
import RellaxItem from 'components/items/RellaxItem';
import SeoHandler from 'components/global/SeoHandler';
import CardItem from 'components/items/CardItem/CardItem';
import styleIdentifiers from './leftSub.scss';

// assets
import Unicorn from './assets/unicorn.svg';
import SmallCloud from './assets/small-cloud.svg';
import BigCloud from './assets/big-cloud.svg';
import Illu1 from './assets/pitchArena.svg';
import Illu2 from './assets/startups.svg';
import Illu3 from './assets/callcenter.svg';
import Illu4 from './assets/unicorn-news.svg';
import SmallStar from './assets/small-star.svg';
import BigStar from './assets/big-star.svg';
import Hexagon from './assets/hexagon.svg';
import Triangle from './assets/triangle.svg';
import Square from './assets/square.svg';
import HalfCircle from './assets/halfcircle.svg';
import CloundBackground from './assets/cloud_blue.svg';
import RoundedStar from './assets/rounded_star.svg';
import Check from './assets/check.svg';
import Thumbnail from './assets/thumbnail.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type LeftSubProps = StateProps & DispatchProps & OwnProps;

interface LeftSubState {}

export default class LeftSub extends Component<LeftSubProps, LeftSubState> {
  submit = (values: Record<string, any>): void => {
    const { subscribe, history } = this.props;
    subscribe({ data: values, callback: (): void => history.push('/blog/thank-you-blog') });
  };

  render(): JSX {
    const { history } = this.props;
    return (
      <div className={styles('LeftSub')}>
        <SeoHandler path="web.left.seo" image={Thumbnail} />
        <div className={styles('container')}>
          <section className={styles('first')}>
            <h1 className={styles('title')}>
              <TextItem path="web.left.title" />
            </h1>
            <CustomButton
              className={styles('button')}
              action={(): void =>
                this.secondSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              color="grey"
              label="web.left.button"
              id="left-section1"
            />
            <div className={styles('illu-container')}>
              <img className={styles('cloud')} src={BigCloud} alt="cloud" />
              <img className={styles('cloud-2')} src={SmallCloud} alt="cloud" />
              <img className={styles('unicorn')} src={Unicorn} alt="unicorn" />
              <img src={Hexagon} className={styles('shape-1')} alt="shape" />
              <img src={HalfCircle} className={styles('shape-2')} alt="shape" />
              <img src={Square} className={styles('shape-3')} alt="shape" />
              <img src={Triangle} className={styles('shape-4')} alt="shape" />
              <div className={styles('rectangle')} />
              <img src={SmallStar} className={styles('star-1')} alt="star" />
              <img src={BigStar} className={styles('star-2')} alt="star" />
            </div>
          </section>
          <section className={styles('second')} ref={el => (this.secondSection = el)}>
            <div className={styles('content')}>
              <img className={styles('illu')} src={Illu1} alt="illu" />
              <div className={styles('info')}>
                <div className={styles('title')}>
                  <TextItem path="web.left.first.title" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="web.left.first.text" />
                </div>
                {/* <a
                  href="https://pitcharena.makeit-group.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles('button')}
                >
                  <CustomButton id="left-section2" color="pink" label="web.left.first.button" />
                </a> */}
              </div>
            </div>
          </section>
          <section className={styles('third')}>
            <div className={styles('content')}>
              <div className={styles('illu')}>
                <CardItem noLine noPadding className={styles('illu_container')}>
                  <div className={styles('cloud_container')}>
                    <img src={CloundBackground} alt="background" className={styles('cloud')} />
                    <img className={styles('star-1')} src={RoundedStar} alt="star-1" />
                    <img className={styles('check')} src={Check} alt="check" />
                    <img className={styles('star-2')} src={RoundedStar} alt="star-2" />
                  </div>
                </CardItem>
              </div>
              <div className={styles('info')}>
                <div className={styles('title')}>
                  <TextItem path="web.left.Sixth.title" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="web.left.Sixth.text" />
                </div>
                <CustomButton
                  className={styles('button')}
                  action={() => history.push('/business-prototyping-arena')}
                  color="pink"
                  label="web.left.Sixth.button"
                  id="left-section5"
                />
              </div>
            </div>
          </section>
          <section className={styles('fourth')}>
            <div className={styles('content')}>
              <div className={styles('info')}>
                <div className={styles('title')}>
                  <TextItem path="web.left.second.title" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="web.left.second.text" />
                </div>
                <a
                  href="https://mystartupwith.makeit-studio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles('button')}
                >
                  <CustomButton
                    className={styles('button')}
                    color="yellow"
                    label="web.left.second.button"
                    id="left-section3"
                  />
                </a>
              </div>
              <img className={styles('illu')} src={Illu2} alt="illu" />
            </div>
          </section>
          <section className={styles('fifth')}>
            <div className={styles('content')}>
              <img className={styles('illu')} src={Illu4} alt="illu" />
              <div className={styles('form')}>
                <div className={styles('title')}>
                  <TextItem isHtml path="web.left.third.title" />
                </div>
                <div className={styles('subtitle')}>
                  <TextItem isHtml path="web.left.third.subtitle" />
                </div>
                <NewsLetterForm
                  contentClassName={styles('form-container')}
                  onSubmit={this.submit}
                  colorButton="pink"
                  noSpace
                />
              </div>
            </div>
          </section>
          <section className={styles('sixth')}>
            <div className={styles('content')}>
              <div className={styles('info')}>
                <div className={styles('title')}>
                  <TextItem path="web.left.fourth.title" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="web.left.fourth.text" />
                </div>
                <CustomButton
                  className={styles('button')}
                  action={(): void => history.push('/contact')}
                  color="pink"
                  label="web.left.fourth.button"
                  id="left-section5"
                />
              </div>
              <img className={styles('illu')} src={Illu3} alt="illu" />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
