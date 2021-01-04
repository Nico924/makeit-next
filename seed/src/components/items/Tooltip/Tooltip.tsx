import * as React from 'react';
import classNames from 'classnames/bind';
import Dropdown from 'components/structure/Dropdown';
import CustomIcon from 'components/items/CustomIcon';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './tooltip.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  direction: string;
  contentClassName: string;
  children: React.Element<any>;
  text: string;
  item: React.Element<any>;
  icon: string;
  iconClassName: string;
  size: string;
  displayArrow?: boolean;
  color: string;
}

export type TooltipProps = StateProps & DispatchProps & OwnProps;

interface TooltipState {}

export default class Tooltip extends React.Component<TooltipProps, TooltipState> {
  render(): JSX {
    const {
      reactIcons,
      direction,
      className,
      contentClassName,
      children,
      arrowStyle,
      displayArrow,
      text,
      item,
      icon,
      iconClassName,
      ...rest
    } = this.props;

    let element = item;
    if (!element && icon) {
      element = (
        <span className={iconClassName}>
          <CustomIcon reactIcons={reactIcons} icon={icon} />
        </span>
      );
    }

    return (
      <Dropdown
        {...this.props}
        className={styles('Tooltip', className)}
        item={element}
        {...rest}
        noArrow={!displayArrow}
        center
        arrowStyle={arrowStyle}
        direction={direction}
        contentClass={styles('content', contentClassName)}
        hover
      >
        <div>
          {text && <TextItem path={text} />}
          {children}
        </div>
      </Dropdown>
    );
  }
}
