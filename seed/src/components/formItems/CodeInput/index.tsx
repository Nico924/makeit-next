import React, { useState, useEffect } from 'react';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';
import ReactCodeInput from 'react-code-input';
import FormItemLabel from 'components/items/FormItemLabel';
import styleIdentifiers from './codeInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type CodeInputProps = StateProps & DispatchProps & OwnProps;

const CodeInput = (props: CodeInputProps) => {
  const { input, className, label, codeType, fields } = props;
  // mapStateToProps
  const lg = useSelector((state: StoreState) => state.content.lg);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  return (
    <FormElement {...props} className={styles('code-input', className)}>
      {label && <FormItemLabel {...props} />}
      <div className={styles('code', label && 'has-label')}>
        <ReactCodeInput
          value={input.value}
          onChange={input.onChange}
          type={codeType || 'number'}
          fields={fields || 6}
        />
      </div>
    </FormElement>
  );
};

export default CodeInput;
