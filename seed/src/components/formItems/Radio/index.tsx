import React, { useState, useEffect } from 'react';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import { getContent, clone } from 'store/utils/helper';
import uniqid from 'uniqid';
import FormItemLabel from 'components/items/FormItemLabel';
import TextItem from 'components/items/TextItem';
import FormElement from 'components/structure/FormElement';
import styleIdentifiers from './radio.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ProjectRadioProps = StateProps & DispatchProps & OwnProps;

const ProjectRadio = (props: ProjectRadioProps) => {
  const {
    items,
    input,
    label,
    className,
    radioClassName,
    onChange,
    circleClassName,
    insideCircleClassName,
    textClassName,
    rowClassName,
    inlined,
  } = props;
  // mapStateToProps
  const content = useSelector((state: StoreState) => state.content.raw);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  const treatItems = () => {
    let listItems;

    if (typeof items === 'string' && content) {
      listItems = getContent(content, items);
    } else {
      listItems = clone(items);
    }
    if (!Array.isArray(listItems) && typeof listItems === 'object') {
      listItems = Object.values(listItems);

      listItems.map(item => {
        item.id = uniqid();
        return item;
      });
    }

    if (!listItems) return null;

    return listItems;
  };

  const list = treatItems();

  const isChecked = item => {
    const itemValue = item.value || item.label || item;

    // console.log('input', input.value, itemValue);

    return input.value === itemValue;
  };

  const handleChange = item => {
    const value = (item && (item.value || item.label)) || item;

    if (input.onChange) input.onChange(value);

    if (onChange) onChange(value);
  };
  return (
    <FormElement {...props} className={styles('radio', className, radioClassName)}>
      {label && <FormItemLabel {...props} className="" />}
      <div className={styles('items-wrapper', inlined && 'inlined')}>
        {list &&
          list.map(function(elem, index) {
            return (
              <div
                key={index}
                className={styles('row-container', rowClassName, isChecked(elem) && 'active')}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
              >
                <div
                  className={styles('circle', circleClassName)}
                  onClick={() => handleChange(elem)}
                >
                  <div className={styles('inside-circle', insideCircleClassName)} />
                </div>
                <div className={styles('text', textClassName)} onClick={() => handleChange(elem)}>
                  <TextItem path={elem.label || elem} />
                </div>
              </div>
            );
          })}
      </div>
    </FormElement>
  );
};

export default ProjectRadio;
