import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styleIdentifiers from './illustration.scss';
import BlueStar from './assets/star-blue.svg';
import YellowStar from './assets/star-yellow.svg';
import DropsRed from './assets/drops.svg';
import RectangleRounded from './assets/rectangle-round.svg';
import DropsBlue from './assets/drops-blue.svg';
import ThinkMoney from './assets/think-money.svg';
import ThinkingText from './assets/think.svg';
import LetterBox from './assets/letterbox.svg';
import Letter from './assets/letter.svg';
import Quote from './assets/quote.svg';
import Play from './assets/play.svg';
import SquareRounded from './assets/square-rounded.svg';
import FourBranchStar from './assets/star-four-branch.svg';
import BadgeFree from './assets/badge-free.svg';
import Exclamation from './assets/exclamation.svg';
import Checked from './assets/checked.svg';
import Team from './assets/team.svg';
import Files from './assets/files.svg';
import Prohibited from './assets/prohibited.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  illu: string;
  alt: string;
  className: string;
  imgClassName: string;
  color: string;
}

export type IllustrationProps = StateProps & DispatchProps & OwnProps;

interface IllustrationState {}

export default class Illustration extends Component<IllustrationProps, IllustrationState> {
  handleSource = (): any => {
    const { illu, color } = this.props;
    switch (illu) {
      case 'stars':
        return BlueStar;
      case 'yellow-stars':
        return YellowStar;
      case 'rectangle-round':
        return RectangleRounded;
      case 'think-money':
        return ThinkMoney;
      case 'drops':
        if (color === 'red' || !color) return DropsRed;
        if (color === 'blue') return DropsBlue;
        return false;
      case 'thinking':
        return ThinkingText;
      case 'letter':
        return Letter;
      case 'letterbox':
        return LetterBox;
      case 'quote':
        return Quote;
      case 'play':
        return Play;
      case 'square-round':
        return SquareRounded;
      case 'star-four':
        return FourBranchStar;
      case 'badge-free':
        return BadgeFree;
      case 'exclamation':
        return Exclamation;
      case 'checked':
        return Checked;
      case 'files':
        return Files;
      case 'team':
        return Team;
      case 'prohibited':
        return Prohibited;
      default:
        return false;
    }
  };

  render(): JSX {
    const { alt, className, imgClassName } = this.props;
    return (
      <div className={styles('Illustration', className)}>
        <img
          alt={alt || 'illustration'}
          className={styles(imgClassName)}
          src={this.handleSource()}
        />
      </div>
    );
  }
}
