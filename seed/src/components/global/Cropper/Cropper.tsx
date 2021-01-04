import * as React from 'react';
import classNames from 'classnames/bind';
import CropperJS from 'cropperjs';

import Button from 'components/items/Button';
import config from 'config/general';
import styleIdentifiers from './cropper.scss';

if (typeof window !== 'undefined') {
  require('!style-loader!css-loader!cropperjs/dist/cropper.css');
}

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  src: string;
  aspectRatio: number;
  options: {};
  action: Function;
}

export type CropperProps = StateProps & DispatchProps & OwnProps;

interface CropperState {}

export default class Cropper extends React.Component<CropperProps, CropperState> {
  constructor(props: CropperProps) {
    super(props);
    this.state = {};
    this.setRef = this.setRef.bind(this);
    this.saveCrop = this.saveCrop.bind(this);
  }

  componentDidUpdate(prevProps: CropperProps): void {
    const { src, aspectRatio } = this.props;
    if (prevProps.src !== src && this.cropper) {
      this.cropper.replace(src);
    }
    if (prevProps.aspectRatio !== aspectRatio && this.cropper) {
      this.cropper.setAspectRatio(aspectRatio);
    }
  }

  setRef = (image: HTMLElement | null): void => {
    if (!image) {
      return;
    }

    this.image = image;
    if (!this.cropper) {
      this.createCropper();
    }
  };

  saveCrop = (): void => {
    const { action, apollo } = this.props;

    const canvas = this.cropper.getCroppedCanvas();
    if (!canvas) {
      return;
    }

    const type = this.image && this.image.src.split(';')[0].split('/')[1];

    if (typeof action === 'function') {
      if (apollo) {
        action(canvas.toDataURL(`image/${type}`));
      }
      // OLD WAY NOT APOLLO
      else {
        canvas.toBlob((blob): void => {
          action(blob);
        });
      }
    }
  };

  createCropper(): void {
    // return
    let { options } = this.props;
    const { aspectRatio } = this.props;

    options = {
      viewMode: 1,
      ...options,
    };

    options.aspectRatio = aspectRatio;

    options.ready = (): {} => {};
    options.crop = (): {} => {};

    this.cropper = new CropperJS(this.image, options);
  }

  render(): JSX {
    const { src } = this.props;
    return (
      <div className={styles('Cropper')}>
        <div className={styles('img')}>
          <img ref={this.setRef} src={src} alt="cropper-preview" />
        </div>
        <div className={styles('actions')}>
          <Button
            className={styles('no-margin')}
            color="blue"
            label={config.cropperSavePath}
            action={this.saveCrop}
          />
        </div>
      </div>
    );
  }
}
