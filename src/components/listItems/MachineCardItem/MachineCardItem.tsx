import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Spring } from 'react-spring/renderprops.cjs';
import CardItem from 'components/items/CardItem';
import styleIdentifiers from './machineCardItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  children: Record<string, any>;
  delayCard: number;
  linkRight: boolean;
  linkBottom: boolean;
  delayLink: number;
  activeLink: boolean;
  active: boolean;
  className: string;
}

export type MachineCardItemProps = StateProps & DispatchProps & OwnProps;

interface MachineCardItemState {}

export default class MachineCardItem extends Component<MachineCardItemProps, MachineCardItemState> {
  render(): JSX {
    const {
      active,
      children,
      delayCard,
      delayLink,
      linkRight,
      className,
      linkBottom,
      activeLink,
      title,
      linkTop,
      ...restProps
    } = this.props;
    return (
      <Spring
        from={{ top: 200, opacity: 0 }}
        delay={active ? delayCard : 0}
        to={{ top: active ? 0 : 200, opacity: active ? 1 : 0 }}
      >
        {({ ...rest }): JSX => (
          <CardItem
            className={styles('card-item', className)}
            contentClassName={styles('card')}
            titleClassName={styles('title-card')}
            noLine
            onlyTitleMobile
            title={title}
            {...restProps}
            style={{ ...rest }}
            outContent={(
              <Spring
                from={{ right: 0, bottom: 0 }}
                config={{ duration: 200 }}
                delay={activeLink ? delayLink : 0}
                to={{
                  right: activeLink ? 60 : 0,
                  bottom: activeLink ? 60 : 0,
                }}
              >
                {({ right, bottom }): JSX => (
                  <div
                    className={styles(linkRight && 'link-right', linkBottom && 'link-bottom')}
                    style={{
                      right: linkRight ? `-${right}px` : null,
                      bottom: linkBottom ? `-${bottom}px` : null,
                      top: linkTop && linkTop,
                    }}
                  />
                )}
              </Spring>
            )}
          >
            {children}
          </CardItem>
        )}
      </Spring>
    );
  }
}
