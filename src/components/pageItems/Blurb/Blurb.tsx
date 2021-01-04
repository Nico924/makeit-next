import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import Illustration from "components/items/Illustration";
import styleIdentifiers from "./blurb.scss";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  img: string;
  text: string;
  width: string;
  type: string;
  illu: string;
  tAlign: string;
}

export type BlurbProps = StateProps & DispatchProps & OwnProps;

const Blurb = ({
  img,
  text,
  width,
  type,
  illu,
  classN,
  tAlign,
}: BlurbProps) => {
  return (
    <div className={styles("blurb", width, classN, type)}>
      {illu && <Illustration illu={illu} />}
      {img && <img src={img} alt="warning" />}
      <div className={styles("text", tAlign)}>
        <TextItem path={text} isHtml />
      </div>
    </div>
  );
};

export default Blurb;
