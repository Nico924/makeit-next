import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import CustomButton from "components/items/CustomButton";
import { NavLink } from "react-router-dom";
import styleIdentifiers from "./investHeader.scss";

// Assets
import logo from "./assets/logo.svg";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestHeaderProps = StateProps & DispatchProps & OwnProps;

const InvestHeader = (props: InvestHeaderProps) => {
  const { history, profile } = props;
  return (
    <div className={styles("InvestHeader")}>
      <div className={styles("container")}>
        <div className={styles("logo")}>
          <img src={logo} alt="logo" />
        </div>
        {profile && profile.data && (
          <div className={styles("menu")}>
            <NavLink className={styles("item-menu")} exact to="#context">
              <TextItem path="investinideasus.Header.context" />
            </NavLink>
            <NavLink className={styles("item-menu")} to="#starwars">
              <TextItem path="investinideasus.Header.starwars" />
            </NavLink>
            <NavLink className={styles("item-menu")} to="#resource">
              <TextItem path="investinideasus.Header.resource" />
            </NavLink>
            <CustomButton
              noMargin
              containerClassName={styles("item-menu")}
              className={styles("button")}
              color="aqua"
              label="investinideasus.Header.contact"
              action={() => history.push("#contact")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestHeader;
