import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Illustration from 'components/items/Illustration';
import { getContent } from 'store/utils/helper';
import styleIdentifiers from './videoArticleItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type VideoArticleItemProps = StateProps & DispatchProps & OwnProps;

interface VideoArticleItemState {}

export default class VideoArticleItem extends Component<
  VideoArticleItemProps,
  VideoArticleItemState
> {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  playVideo = () => {
    this.setState({ play: true });
  };

  getVideoFromContent = () => {
    const { content, lg, path } = this.props;
    const result = getContent(content, path, lg);
    if (result) {
      if (result.value) return result.value;
    }
    return false;
  };

  render(): JSX {
    const { video, className, path } = this.props;
    const { play } = this.state;

    return (
      <div className={styles('VideoArticleItem', className)} onClick={(): void => this.playVideo()}>
        <iframe
          src={`${path ? this.getVideoFromContent() : video}?autoplay=${play ? '1' : '0'}`}
          style={{ height: '100%', width: '100%' }}
          allowFullScreen="allowfulllscreen"
        />
      </div>
    );
  }
}
