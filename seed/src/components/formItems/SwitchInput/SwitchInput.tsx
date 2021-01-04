import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Switch from 'react-switch';
import { viewConfig } from 'config/general';
import styleIdentifiers from './switchInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface SwitchInputProps {
  label: string;
  input: {};
  noMargin?: boolean;
  labelClassName?: string;
  position?: string; // left | right
  left?: boolean;
  right?: boolean;
  wide?: boolean;
  switchClassName?: string;
}

interface SwitchInputState {}

// Link to doc : https://github.com/markusenglund/react-switch#readme

export default class SwitchInput extends React.Component<SwitchInputProps, SwitchInputState> {
  handleChange = (checked: boolean) => {
    const { input, onChange } = this.props;
    if (input) {
      input.onChange(checked);
    }
    if (onChange) {
      onChange(checked);
    }
  };

  render() {
    const {
      inputClassName,
      customClassName,
      label,
      input,
      onColor,
      offColor,
      onHandleColor,
      offHandleColor,
      borderColor,
      boxShadow,
      handleDiameter,
      className,
      height,
      width,
      wide,
      labelClassName,
      noMargin,
      position,
      left,
      right,
      switchClassName,
      uncheckedIcon,
      checkedIcon,
      disabled,
      checked,
    } = this.props;

    const activeColor = onColor || (viewConfig && viewConfig.switchActive);

    const isChecked = !!(input && input.value) || checked || false;

    return (
      <div
        className={styles(
          'SwitchInput',
          wide && 'wide',
          noMargin && 'no-margin',
          position,
          left && 'left',
          right && 'right',
          switchClassName && switchClassName,
          className && className,
        )}
      >
        {(right || !left) && (
          <div className={styles('label', labelClassName)}>
            <TextItem path={label} />
          </div>
        )}
        <div className={styles(inputClassName)}>
          <Switch
            className={(className, customClassName)}
            onChange={this.handleChange}
            checked={isChecked}
            handleDiameter={handleDiameter || 20}
            height={height || 18}
            width={width || 34}
            onColor={activeColor}
            offColor={offColor}
            onHandleColor={onHandleColor}
            offHandleColor={offHandleColor}
            boxShadow={viewConfig && viewConfig.shadowSwitch}
            checkedIcon={checkedIcon || false}
            uncheckedIcon={uncheckedIcon || false}
            disabled={disabled}
          />
        </div>
        {left && (
          <div className={styles('label', labelClassName)}>
            <TextItem path={label} />
          </div>
        )}
      </div>
    );
  }
}
