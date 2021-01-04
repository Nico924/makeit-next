import * as React from 'react';
import classNames from 'classnames/bind';
import { SketchPicker } from 'react-color';
import styleIdentifiers from './colorPicker.scss';

const styles = classNames.bind(styleIdentifiers);

export interface ColorPickerProps {
  input: {};
}

interface ColorPickerState {
  color: any;
}

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props);

    const { input } = this.props;
    this.state = {
      color: input.value || null,
    };
  }

  handleChange = (value: any) => {
    const { input, onChange, saveValue } = this.props;
    const { color } = this.state;

    if ((color && color.hex !== value.hex) || !color) {
      this.setState({ color: value });

      if (onChange) onChange(value);

      if (saveValue && value[saveValue]) {
        input.onChange(value[saveValue]);
      } else {
        input.onChange(value);
      }
    }
  };

  render() {
    const { color } = this.state;
    const { noMargin, disabled } = this.props;

    return (
      <div className={styles('ColorPicker', noMargin && 'no-margin')}>
        <SketchPicker onChange={this.handleChange} color={color || ''} />
      </div>
    );
  }
}
