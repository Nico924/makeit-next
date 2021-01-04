import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styleIdentifiers from './rellaxItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  noParallax: boolean;
  width: number;
  color: string;
  full: boolean;
}

export type RellaxItemProps = StateProps & DispatchProps & OwnProps;

interface RellaxItemState {}

export default class RellaxItem extends Component<RellaxItemProps, RellaxItemState> {
  renderSvg = (type: string): JSX => {
    const { children, color, width } = this.props;
    switch (type) {
      case 'triangle':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || '104'}
            height="100"
            viewBox="0 0 104 100"
          >
            <path
              fill={color || '#64C1BE'}
              fillRule="nonzero"
              stroke="#000"
              strokeWidth="3"
              d="M3.278 78.492L68.945 3l32.557 94.552z"
            />
          </svg>
        );
      case 'oval':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="82" height="106" viewBox="0 0 82 106">
            <path
              fill={color || '#FAD843'}
              fillRule="nonzero"
              stroke="#000"
              strokeWidth="3"
              d="M50.577 103.626c26.327-13.414 36.795-45.63 23.38-71.957C60.543 5.342 28.327-5.126 2 8.289l48.577 95.337z"
            />
          </svg>
        );
      case 'rectangle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91">
            <path
              fill={color || '#64C1BE'}
              fillRule="nonzero"
              stroke="#000"
              strokeWidth="3"
              d="M1.738 14.837l13.098 74.276 74.29-13.098L76.029 1.739 1.738 14.837z"
            />
          </svg>
        );
      case 'polygone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="94" height="86" viewBox="0 0 94 86">
            <path
              fill={color || '#F1A4AB'}
              fillRule="nonzero"
              stroke="#000"
              strokeWidth="3"
              d="M64.589 1.583L91.67 37.52 74.087 78.944l-44.664 5.484L2.34 48.49 19.924 7.067z"
            />
          </svg>
        );
      default:
        return children;
    }
  };

  render(): JSX {
    const { className, type, rotate, full } = this.props;
    return (
      <div className={styles('RellaxItem', className, full && 'full')}>
        <div style={{ transform: `rotate(${rotate || 0}deg)` }}>{this.renderSvg(type)}</div>
      </div>
    );
  }
}
