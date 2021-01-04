import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CardItem from 'components/items/CardItem';
import CustomButton from 'components/items/CustomButton';
import Illustration from 'components/items/Illustration';
import find from 'lodash/find';
import styleIdentifiers from './loading.scss';
import Dream from './assets/makeit-dream.jpg';
import Do from './assets/makeit-do.jpg';
import Exclamation from './assets/exclamation.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  updateLoading: Function;
}

export interface OwnProps {}

export type LoadingProps = StateProps & DispatchProps & OwnProps;

interface LoadingState {}

export default class Loading extends Component<LoadingProps, LoadingState> {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      percentage: 0,
      stuckDuration: 0,
      stuck: [
        { time: 28, duration: 5 },
        { time: 53, duration: 9 },
        { time: 99, duration: 8 },
      ],
    };
  }

  componentWillUnmount(): void {
    clearTimeout(this.myFakeLoader);
  }

  startLoading = (): void => {
    const { updateLoading } = this.props;

    // Remove this line for active fake loader
    updateLoading(false);
    // Uncomment for active fake loader
    // this.myFakeLoader = setTimeout((): void => this.tick(), 50);
    // this.setState({ start: true });
  };

  tick(): void {
    const { percentage, stuck, stuckDuration } = this.state;
    const { updateLoading } = this.props;

    const lag = find(stuck, ['time', percentage]);

    if (lag && stuckDuration !== lag.duration) {
      this.setState({ stuckDuration: stuckDuration + 1 });
      setTimeout((): void => this.tick(), 50);
    } else if (percentage === 100) {
      clearTimeout(this.myFakeLoader);
      updateLoading(false);
    } else {
      if (stuckDuration !== 0) {
        this.setState({ stuckDuration: 0 });
      }
      this.setState({ percentage: percentage + 1 });
      setTimeout((): void => this.tick(), 50);
    }
  }

  render(): JSX {
    const { percentage, start } = this.state;
    const { updateLoading } = this.props;
    return (
      <div className={styles('Loading')}>
        {start ? (
          <div className={styles('center')}>
            <CardItem
              contentClassName={styles('no-padding')}
              className={styles('first-pop', percentage >= 28 && 'display')}
              noHeader
            >
              <div className={styles('title', 'aqua')}>Dream</div>
              <div className={styles('image')} style={{ backgroundImage: `url(${Dream})` }} />
            </CardItem>
            <CardItem
              contentClassName={styles('no-padding')}
              className={styles('second-pop', percentage >= 53 && 'display')}
              noHeader
            >
              <div className={styles('title', 'blue')}>Do</div>
              <div className={styles('image')} style={{ backgroundImage: `url(${Do})` }} />
            </CardItem>
            <CardItem
              action={() => updateLoading(false)}
              noLine
              title="Setup"
              className={styles('card')}
            >
              <div className={styles('text-card')}>
                The dream is being dreamed.
                <br />
                Our website is loading the do.
              </div>
              <div className={styles('progress-container')}>
                <div className={styles('indic')}>
                  {percentage}
                  {' %'}
                </div>
                <div className={styles('progress')} style={{ maxWidth: `${percentage}%` }} />
              </div>
            </CardItem>
          </div>
        ) : (
          <div className={styles('disclaimer')}>
            <CardItem title="Important Notice" noLine>
              <div className={styles('content')}>
                <Illustration className={styles('stars')} illu="stars" />
                <Illustration className={styles('drops')} illu="drops" />
                <img src={Exclamation} alt="illustration-exclamation" />
                <div className={styles('text')}>
                  <TextItem path="web.home.title" isHtml />
                </div>
              </div>
            </CardItem>
            <CustomButton
              className={styles('button')}
              action={(): void => this.startLoading()}
              color="grey"
              id="loading-screen-read"
              label="I have read this message"
            />
          </div>
        )}
      </div>
    );
  }
}
