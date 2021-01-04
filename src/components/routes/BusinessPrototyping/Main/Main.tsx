import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import CustomHubSpotForm from 'components/forms/CustomHubSpotForm';
import CardItem from 'components/items/CardItem';
import SeoHandler from 'components/global/SeoHandler';
import Blurb from 'components/pageItems/Blurb';
import styleIdentifiers from './main.scss';

// Assets
import logo from './assets/bpc-canva.svg';
import section2 from './assets/artwork-section-2.svg';
import payment from './assets/payment.svg';
import davidWorkshpop from './assets/david-workshop.jpg';
import atelierWorkshop from './assets/workshops-atelier.jpg';
import warning from './assets/warning.svg';
import validated from './assets/validated.svg';
import actions from './assets/actions.svg';
import computer from './assets/computer.svg';
import sanou from './assets/sanou.jpg';
import david from './assets/david.jpg';
import calendar from './assets/calendar.svg';
import community from './assets/community.svg';
import info from './assets/info.svg';
import language from './assets/language.svg';
import onlygoodvibes from './assets/onlygoodvibes.svg';
import pin from './assets/pin.svg';
import pizza from './assets/pizza.svg';
import stop from './assets/stop.svg';
import team from './assets/team.svg';
import office from './assets/office.svg';
import thumbnail from './assets/thumbnail.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type MainProps = StateProps & DispatchProps & OwnProps;

interface MainState {}

export default class Main extends Component<MainProps, MainState> {
  constructor(props) {
    super(props);

    this.state = {
      showEmailForm: false,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ showEmailForm: true }), 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setRef = (node: any, elem: string): void => {
    if (node) this[elem] = node;
  };

  render() {
    const { content } = this.props;
    const { showEmailForm } = this.state;
    const section5BlurbImages = [
      { src: warning, alt: 'warning' },
      { src: computer, alt: 'computer' },
      { src: validated, alt: 'validated' },
      { src: actions, alt: 'actions' },
    ];
    const section7BlurbImages = [
      { src: team, alt: 'team' },
      { src: community, alt: 'community' },
      { src: pizza, alt: 'pizza' },
      { src: stop, alt: 'stop' },
    ];
    const section8BlurbImages = [
      { src: calendar, alt: 'calendar' },
      { src: pin, alt: 'pin' },
      { src: info, alt: 'info' },
      { src: language, alt: 'language' },
    ];

    return (
      <div className={styles('Main')}>
        <SeoHandler path="business-proto.Home.seo" image={thumbnail} />
        <CardItem
          action={() => this.setState({ showEmailForm: false })}
          mobileCross
          noLine
          reverseClose
          className={styles('email-form', showEmailForm && 'display')}
        >
          <div>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.popup.text" />
            </div>
            <CustomHubSpotForm
              checkboxLabelColor="black"
              colorError="red"
              formId="729c8d34-2b93-480f-8381-037dcb6a61d6"
              portalId="3047087"
            />
          </div>
        </CardItem>
        <section className={styles('top')}>
          <div className={styles('content')}>
            <img className={styles('logo')} alt="logo" src={logo} />
            <div className={styles('white')}>
              <TextItem path="business-proto.Home.sectionOne.title" />
              <span role="img"> 🙊</span>
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionOne.text" />
            </div>
            <div className={styles('button-container')}>
              <CustomButton
                label="Learn More"
                action={() => this.first.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                color="grey"
                className={styles('button')}
              />
              <CustomButton
                label="Register"
                action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                color="pink"
                className={styles('button')}
              />
            </div>
          </div>
        </section>
        <section className={styles('pink')} ref={e => this.setRef(e, 'first')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionTwo.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionTwo.text" />
            </div>
            <img src={section2} alt="artwork" />
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionTwo.textBelow" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="grey"
              className={styles('button')}
            />
          </div>
        </section>
        <section className={styles('aqua')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionThree.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionThree.textAbove" />
            </div>
            <img src={payment} alt="payment" />
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionThree.textBelow" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="pink"
              className={styles('button')}
            />
          </div>
        </section>
        <section>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionFour.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionFour.textAbove" />
            </div>
            <div className={styles('container-image')}>
              <img className={styles('atelier')} src={atelierWorkshop} alt="aterlier-workshop" />
              <img className={styles('david')} src={davidWorkshpop} alt="david-workshop" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionFour.textBelow" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="pink"
              className={styles('button')}
            />
          </div>
        </section>
        <section className={styles('pink')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionFive.title" />
            </div>

            <div className={styles('container-box')}>
              {content &&
                content.raw &&
                Object.values(content.raw['business-proto'].Home.sectionFive.blurbs).map(
                  (item, key) => (
                    <Blurb
                      width="half"
                      type="vertical"
                      img={section5BlurbImages[key].src}
                      alt={section5BlurbImages[key].alt}
                      text={item.en}
                      key={key}
                    />
                  ),
                )}
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionFive.text" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="grey"
              className={styles('button')}
            />
          </div>
        </section>
        <section className={styles('aqua')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionSix.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionSix.textAbove" />
            </div>
            <div className={styles('container-image')}>
              <img className={styles('david')} src={david} alt="david" />
              <img className={styles('sanou')} src={sanou} alt="sanou" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionSix.textBelow" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="pink"
              className={styles('button')}
            />
          </div>
        </section>
        <section>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionSeven.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionSeven.textAbove" />
            </div>
            <div className={styles('container-box')}>
              {content &&
                content.raw &&
                Object.values(content.raw['business-proto'].Home.sectionSeven.blurbs).map(
                  (item, key) => (
                    <Blurb
                      width="half"
                      type="vertical"
                      img={section7BlurbImages[key].src}
                      alt={section7BlurbImages[key].alt}
                      text={item.en}
                      key={key}
                    />
                  ),
                )}
            </div>
            <img src={onlygoodvibes} alt="good-vibes" />
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionSeven.textBelow" />
            </div>
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="grey"
              className={styles('button')}
            />
          </div>
        </section>
        <section className={styles('pink')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionEight.title" />
            </div>
            <div className={styles('container-box')}>
              {content &&
                content.raw &&
                Object.values(content.raw['business-proto'].Home.sectionEight.blurbs).map(
                  (item, key) => (
                    <Blurb
                      width="half"
                      type="vertical"
                      img={section8BlurbImages[key].src}
                      alt={section8BlurbImages[key].alt}
                      text={item.en}
                      key={key}
                    />
                  ),
                )}
            </div>
            <img src={office} alt="office" />
            <CustomButton
              action={() => this.form.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              label="Register"
              color="grey"
              className={styles('button')}
            />
          </div>
        </section>
        <section className={styles('aqua', 'bottom')} ref={e => this.setRef(e, 'form')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <TextItem path="business-proto.Home.sectionNine.title" />
            </div>
            <div className={styles('text')}>
              <TextItem path="business-proto.Home.sectionNine.text" />
            </div>
            <CustomHubSpotForm
              colorError="red"
              className={styles('form')}
              portalId="3047087"
              formId="183b316f-5c91-4f82-89b8-c7bfdc078c7c"
            />
          </div>
        </section>
      </div>
    );
  }
}
