import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './testimonialCard.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type TestimonialCardProps = StateProps & DispatchProps & OwnProps;

const TestimonialCard = (props: TestimonialCardProps) => {
  const { photo, text, name, width = 'third' } = props;
  return (
    <div className={styles('TestimonialCard', width)}>
      <div className={styles('image')}>
        <img src={photo} alt="" />
      </div>
      <div className={styles('content')}>
        <p className={styles('name')}>
          <TextItem path={name} />
        </p>
        <p className={styles('text')}>
          <TextItem path={text} />
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
