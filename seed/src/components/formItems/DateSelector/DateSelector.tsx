import * as React from 'react';
import classNames from 'classnames/bind';

import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';

import styleIdentifiers from './dateSelector.scss';

const DatePicker = __BROWSER__ && require('react-date-picker').default;

if (__BROWSER__) require('!style-loader!css-loader!react-calendar/dist/Calendar.css');

if (__BROWSER__) require('!style-loader!css-loader!react-date-picker/dist/DatePicker.css');

const styles = classNames.bind(styleIdentifiers);

interface OwnProps {
  minDate: any;
  handleChange?: Function;
  disabled?: boolean;
  calendarIcon?: string;
  clearIcon?: string;
}
export type DateSelectorProps = FormElementProps &
  FieldWrapperProps &
  FormItemLabelProps &
  OwnProps;

interface DateSelectorState {
  date: any;
}

export default class DateSelector extends React.Component<DateSelectorProps, DateSelectorState> {
  handleChange = (value: any) => {
    const { input, handleChange } = this.props;
    input.onChange(value);
    if (handleChange) handleChange(value);
  };

  render() {
    const {
      className,
      labelClassName,
      input,
      disabled,
      calendarIcon,
      clearIcon,
      valueClassName,
    } = this.props;

    let { minDate } = this.props;

    minDate = (minDate && new Date(minDate)) || null;

    const hasValue = input && input.value;

    let dateValue = input && input.value && new Date(input.value);
    if (isNaN(dateValue && dateValue.getTime())) {
      dateValue = null;
    }

    // if (!DatePicker) return false;
    const ssr = typeof window !== 'undefined';
    if (ssr && !DatePicker) return false;

    return (
      <FormElement {...this.props} className={styles('DateSelector', className)}>
        <FieldWrapper
          {...this.props}
          hasValue={hasValue}
          valueClassName={styles('value', valueClassName)}
          labelClassName={styles('label', labelClassName)}
        >
          {ssr ? (
            <DatePicker
              className="picker"
              calendarIcon={calendarIcon || null}
              calendarClassName="calendar"
              clearIcon={clearIcon}
              minDate={minDate}
              onChange={this.handleChange}
              value={dateValue}
              disabled={disabled}
            />
          ) : (
            <input placeholder="Loading..." />
          )}
        </FieldWrapper>
      </FormElement>
    );
  }
}
