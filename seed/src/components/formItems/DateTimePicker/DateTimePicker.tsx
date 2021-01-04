import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getContent } from 'store/utils/helper';
import DateItem from 'components/items/DateItem/DateItem';
import { FaTimes } from 'react-icons/fa';
import styleIdentifiers from './dateTimePicker.scss';

if (__BROWSER__) require('!style-loader!css-loader!react-datetime/css/react-datetime.css');

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  onChange?: Function;
  noCloseOnSelect?: boolean;
}

export type DateTimePickerProps = StateProps & DispatchProps & OwnProps;

// Source : https://github.com/YouCanBookMe/react-datetime

class DateTimePicker extends React.Component<MyDTPickerProps, MyDTPickerState> {
  state = {};

  componentDidMount() {
    this.handleValue();
  }

  componentDidUpdate(prevProps) {
    const { input } = this.props;

    if (input !== prevProps.input) this.handleValue();
  }

  // currentDate are at 0:00 (therefore NOW (= moment()) is after currentDate for the same day)
  validation = currentDate => {
    const { maxDate, minDate, customValidation } = this.props;

    if (customValidation) return customValidation(currentDate);

    const max = maxDate && moment(maxDate !== true ? maxDate : undefined).startOf('day');
    const min = minDate && moment(minDate !== true ? minDate : undefined).startOf('day');

    if (max && min) return currentDate.isSameOrBefore(max) && currentDate.isSameOrAfter(min);

    if (max) return currentDate.isSameOrBefore(max);

    if (min) return currentDate.isSameOrAfter(min);

    return true;
  };

  handleValue = () => {
    const { input } = this.props;

    this.setState({
      date: input.value ? moment(input.value) : null,
    });
  };

  reset = () => {
    const { input } = this.props;

    this.setState({
      date: null,
    });
    input.onChange(null);
  };

  handleChange = (value: any) => {
    const { input, handleChange, onChange } = this.props;

    this.setState({
      date: value,
    });
    input.onChange(moment(value).format());
    if (handleChange) handleChange(value);

    if (onChange) onChange(value);
  };

  getPlaceholder = () => {
    const { content, lg, placeholder } = this.props;

    if (placeholder) {
      const txt = getContent(content, placeholder, lg) || placeholder;
      return txt;
    }

    return '-';
  };

  renderInput = props => {
    const {
      disabled,
      withValueBorder,
      dateFormat,
      inputClassName,
      placeholderClassName,
      timeFormat,
    } = this.props;

    const { date } = this.state;

    const placeholder = this.getPlaceholder();

    let format = dateFormat;
    if (timeFormat) format += ` ${timeFormat}`;

    return (
      <div
        className={styles('input', withValueBorder && 'with-value-border', inputClassName)}
        onClick={e => {
          if (!disabled) {
            props.onClick(e);
          }
        }}
      >
        {!date && (
          <span className={styles('placeholder', placeholderClassName)}>{placeholder}</span>
        )}
        {date && <DateItem date={date} format={format} />}
        {!disabled && date && (
          <div onClick={this.reset} className={styles('cancel')}>
            <FaTimes />
          </div>
        )}
      </div>
    );
  };

  renderServer = () => {
    const { input, dateFormat } = this.props;

    const value = moment(input.value).format(dateFormat || 'DD/MM/YYYY');

    return this.renderInput({ value });
  };

  render() {
    const {
      className,
      labelClassName,
      disabled,
      valueClassName,
      // Datetime props
      lg,
      utc,
      dateFormat,
      timeFormat,
      timeConstraints,
      viewMode,
      initialViewMode,
      noCloseOnSelect,
    } = this.props;

    const { date } = this.state;

    return (
      <FormElement {...this.props} className={styles('DateTimePicker', className)}>
        <FieldWrapper
          {...this.props}
          valueClassName={styles('value', valueClassName)}
          labelClassName={styles('label', labelClassName)}
        >
          {__BROWSER__ ? (
            <Datetime
              className="picker"
              onChange={this.handleChange}
              isValidDate={this.validation}
              value={date}
              renderInput={this.renderInput}
              disabled={disabled}
              // Datetime props
              locale={lg}
              utc={utc}
              timeConstraints={timeConstraints}
              dateFormat={dateFormat}
              timeFormat={timeFormat || false}
              viewMode={viewMode}
              initialViewMode={initialViewMode || viewMode}
              closeOnSelect={!noCloseOnSelect}
            />
          ) : (
            this.renderServer()
          )}
        </FieldWrapper>
      </FormElement>
    );
  }
}

export default DateTimePicker;
