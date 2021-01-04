import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import { getContent } from "store/utils/helper";
import styleIdentifiers from "./projectRadio.scss";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ProjectRadioProps = StateProps & DispatchProps & OwnProps;

const ProjectRadio = (props: ProjectRadioProps) => {
  const {
    items,
    label,
    input,
    content,
    list,
    lg,
    className,
    meta: { error, touched }
  } = props;

  const [allItems, setAllItems] = useState([]);

  function handleInputChange(val) {
    input.onChange(val);
  }

  useEffect(() => {
    if (list) setAllItems(Object.values(getContent(content, list, lg)));
    if (items) setAllItems(items);
  }, []);

  return (
    <div className={styles("container-input")}>
      <div className={styles("ProjectRadio", className)}>
        <div className={styles("label")}>
          <TextItem path={label} />
        </div>
        <div className={styles("container-item")}>
          {allItems &&
            allItems.map((item, key) => (
              <div
                key={key}
                className={styles("item")}
                onClick={() => handleInputChange(item.value)}
              >
                <div
                  className={styles(
                    "box",
                    input.value === item.value && "check"
                  )}
                />
                <div className={styles("name")}>{item[lg] || item.label}</div>
              </div>
            ))}
        </div>
      </div>
      {error && touched && (
        <div className={styles("error")}>
          <TextItem path={error} />
        </div>
      )}
    </div>
  );
};

export default ProjectRadio;
