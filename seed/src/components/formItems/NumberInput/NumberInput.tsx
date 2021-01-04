import * as React from 'react';

import NumberFormat from 'react-number-format';
import classNames from 'classnames/bind';

import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';

const styles = classNames.bind();

interface InternalProps {
  hideError?: boolean;
  // specific for Number
  suffix?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  thousandSeparator?: string;
  formatNumber?: string;
}

export type NumberInputProps = FormElementProps &
  FieldWrapperProps &
  FormItemLabelProps &
  InternalProps;

interface NumberInputState {}

export default class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
  valueChange = (values: {}) => {
    const { input, formatNumber } = this.props;

    if (input && input.onChange) {
      if (formatNumber) {
        input.onChange(values.value);
      } else {
        input.onChange(values.floatValue);
      }
    }
  };

  render() {
    const {
      // redux form
      input,
      className,
      formatNumber,
      placeholder,
      mask,
      suffix,
      decimalSeparator,
      decimalScale,
      thousandSeparator,
    } = this.props;

    return (
      <FormElement {...this.props} className={styles('Input', className)}>
        <FieldWrapper {...this.props}>
          <NumberFormat
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            isNumericString={typeof input.value === 'string'}
            value={input.value || ''}
            onValueChange={this.valueChange}
            placeholder={placeholder}
            mask={mask}
            format={formatNumber}
            suffix={suffix}
            decimalSeparator={decimalSeparator}
            decimalScale={decimalScale}
            thousandSeparator={thousandSeparator}
          />
        </FieldWrapper>
      </FormElement>
    );
  }
}
