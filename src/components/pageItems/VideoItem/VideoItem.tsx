import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { getContent } from 'store/utils/helper';
import styleIdentifiers from './videoItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type VideoItemProps = StateProps & DispatchProps & OwnProps;

const VideoItem = (props: VideoItemProps) => {
  const { video, className, path, height, content, lg } = props;

  const [play, setPlay] = useState(false);
  const [videoValue, setVideoValue] = useState(null);

  function getVideoFromContent() {
    const result = getContent(content, path, lg);
    if (result) setVideoValue(result);
  }

  useEffect(() => {
    if (path) getVideoFromContent();
    if (video) setVideoValue(video);
  }, []);

  return (
    videoValue && (
      <div className={styles('VideoItem', className)} onClick={(): void => setPlay(true)}>
        <iframe
          src={`${videoValue}?autoplay=${play ? '1' : '0'}`}
          style={{ height: height || '100%', width: '100%' }}
          allowFullScreen="allowfulllscreen"
          title="youtube video"
        />
      </div>
    )
  );
};

export default VideoItem;
