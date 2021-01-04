import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import styleIdentifiers from "./investIllustration.scss";
import FourBranchStar from "./assets/star-four-branch.svg";
import TriangleAqua from "./assets/triangle-aqua.svg";
import PolygonYellow from "./assets/polygon-yellow.svg";
import HalfOvalBlue from "./assets/half-oval-blue.svg";
import SquarePink from "./assets/square-pink.svg";
import DonutBlue from "./assets/donut-blue.svg";
import DonutAqua from "./assets/donut-aqua.svg";
import DonutPink from "./assets/donut-pink.svg";
import Bar from "./assets/bar.svg";
import Quote from "./assets/quote.svg";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestIllustrationProps = StateProps & DispatchProps & OwnProps;

const InvestIllustration = (props: InvestIllustrationProps) => {
  const { illu, color, className, imgClassName, alt, style } = props;

  function handleSource() {
    switch (illu) {
      case "quote":
        return Quote;
      case "donut":
        if (color === "pink") return DonutPink;
        if (color === "aqua") return DonutAqua;
        return DonutBlue;
      case "bar":
        return Bar;
      case "star-four":
        return FourBranchStar;
      case "triangle":
        return TriangleAqua;
      case "polygon":
        return PolygonYellow;
      case "half-oval":
        return HalfOvalBlue;
      case "square":
        return SquarePink;
      default:
        return Bar;
    }
  }

  return (
    <div
      className={styles(
        "InvestIllustration",
        className,
        illu === "donut" && "donut"
      )}
      style={style}
    >
      <img
        alt={alt || "illustration"}
        className={styles(imgClassName)}
        src={handleSource()}
      />
    </div>
  );
};

export default InvestIllustration;
