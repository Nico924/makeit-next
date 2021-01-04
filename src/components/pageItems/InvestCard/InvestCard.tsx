import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styleIdentifiers from "./investCard.scss";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestCardProps = StateProps & DispatchProps & OwnProps;

const InvestCard = (props: InvestCardProps) => {
  const { type, puceColor, className, children, childClassName, size } = props;

  return (
    <div className={styles("InvestCard", className, size)}>
      {type === "puce" && <div className={styles("puce", puceColor)} />}
      <div className={styles("child", childClassName)}>{children}</div>
    </div>
  );
};

export default InvestCard;
