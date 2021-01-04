import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './partnerLogo.scss';

// Assets

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  partner: string;
  className: string;
}

export type PartnerLogoProps = StateProps & DispatchProps & OwnProps;

const PartnerLogo = (props: PartnerLogoProps) => {
  const { partner, className } = props;
  return (
    <div className={styles('PartnerLogo', className)}>
      <div className={styles('logo', partner)} />
    </div>
  );
};

export default PartnerLogo;
