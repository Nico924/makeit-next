import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomIcon from 'components/items/CustomIcon';
import styleIdentifiers from './formItemLabel.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  className: string;
  // Label
  label: string;
  // Label icon
  labelIcon: string;
  labelStyle: {};
  labelClassName: string;
  labelIconStyle: {};
  labelIconClassName: string;
  star: boolean;
  notRequired: string;
  input: {};
}

export type FormItemLabelProps = StateProps & DispatchProps & OwnProps;

interface FormItemLabelState {}

export default class FormItemLabel extends React.Component<FormItemLabelProps, FormItemLabelState> {
  render(): JSX {
    const {
      className,
      label,
      labelClassName,
      labelStyle,
      project,
      labelIcon,
      labelImage,
      labelIconClassName,
      labelIconStyle,
      star,
      notRequired,
      input,
      starClassName,
    } = this.props;

    if (!label) return false;
    return (
      <label
        htmlFor={input && input.name}
        className={styles('FormItemLabel', star && 'required', className, labelClassName)}
        style={labelStyle}
      >
        {labelIcon && (
          <CustomIcon
            project={project}
            icon={labelIcon}
            className={styles('label-icon', labelIconClassName)}
            style={labelIconStyle}
          />
        )}
        {labelImage && (
          <img
            className={styles('label-icon', labelIconClassName)}
            style={labelIconStyle}
            src={labelImage}
            alt={label}
          />
        )}
        <TextItem path={label} />
        {notRequired && <TextItem className={styles('notRequired')} path={notRequired} />}
        {star && <span className={styles('star', starClassName)}>*</span>}
      </label>
    );
  }
}
