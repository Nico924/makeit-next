import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styleIdentifiers from './quoteItem.scss';
import Smile from './assets/smile.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  text: string;
  className: string;
}

export type QuoteItemProps = StateProps & DispatchProps & OwnProps;

interface QuoteItemState {
  color: boolean;
}

export default class QuoteItem extends Component<QuoteItemProps, QuoteItemState> {
  constructor(props) {
    super(props);

    this.state = {
      color: false,
    };
  }

  componentDidMount(): void {
    this.timer = setTimeout((): void => this.tick(), 500);
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }

  tick = (): void => {
    const { color } = this.state;
    this.setState({ color: !color });
    setTimeout((): void => this.tick(), 500);
  };

  render(): JSX {
    const { text, className } = this.props;
    const { color } = this.state;

    return (
      <div className={styles('QuoteItem', className)}>
        <img src={Smile} alt="happiness face" className={styles('head')} />
        <div className={styles('content')}>
          <span className={styles('anime')}>
            <div className={styles('separator', 'first', color && 'color')} />
            {text}
            <div className={styles('separator', color && 'color')} />
          </span>
          <span className={styles('anime')}>
            {text}
            <div className={styles('separator', color && 'color')} />
          </span>
        </div>
      </div>
    );
  }
}
