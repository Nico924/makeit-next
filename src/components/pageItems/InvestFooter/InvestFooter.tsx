import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import PartnerLogo from "components/pageItems/PartnerLogo";
import styleIdentifiers from "./investFooter.scss";

// Assets
import Linkedin from "./assets/linkedin.svg";
import Facebook from "./assets/facebook.svg";
import Instagram from "./assets/instagram.svg";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestFooterProps = StateProps & DispatchProps & OwnProps;

const InvestFooter = (props: InvestFooterProps) => {
  return (
    <div className={styles("InvestFooter")}>
      <div className={styles("container")}>
        <div className={styles("col-wrapper")}>
          <div className={styles("col")}>
            <a
              href="https://www.instagram.com/makeit.startup.studio/"
              target="_blank"
            >
              <img src={Instagram} alt="instagram-logo" />
            </a>
            <a
              href="https://www.facebook.com/MakeitStartupStudio/?ref=page_internal"
              target="_blank"
            >
              <img src={Facebook} alt="facebook-logo" />
            </a>
            <a
              href="https://www.linkedin.com/company/makeitstudio/"
              target="_blank"
            >
              <img src={Linkedin} alt="linkedin-logo" />
            </a>
          </div>
          <div className={styles("col")}>
            <PartnerLogo partner="makeit" className={styles("button")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestFooter;
