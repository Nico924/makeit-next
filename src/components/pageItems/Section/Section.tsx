import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './section.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SectionProps = StateProps & DispatchProps & OwnProps;

const Section = (props: SectionProps) => {
  const { children, classN, before, after, forwardRef } = props;
  return (
    <section className={styles('Section', classN)} ref={forwardRef}>
      {before}
      <div className={styles('contain_wrapper')}>{children}</div>
      {after}
    </section>
  );
};

export default Section;
