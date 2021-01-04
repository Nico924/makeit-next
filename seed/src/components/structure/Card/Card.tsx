
import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Tooltip from 'components/items/Tooltip';
import styleIdentifiers from './card.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  title?: string;
  children?: React.Node;
  classTitle?: string;
  classContent?: string;
  className?: string;
  infoMessage?: string;
  infosRight?: React.Node;
  bottom?: React.Node;
  noHead?: boolean;
  subtitle?: string;
  actionHead?: Function;
  action?: Function;
}

export type CardProps = StateProps & DispatchProps & OwnProps;

interface CardState {}

export default class Card extends React.Component<CardProps, CardState> {
  render(): JSX {
    const {
      title,
      className,
      children,
      classTitle,
      classContent,
      infoMessage,
      infosRight,
      bottom,
      noHead,
      subtitle,
      actionHead,
      action,
    } = this.props;

    return (
      <div className={styles('Card', className)} onClick={action}>
        {!noHead && (
          <div className={styles('head', classTitle, actionHead && 'link')} onClick={actionHead}>
            <div className={styles(subtitle && 'head-content')}>
              <TextItem path={title} />
              {subtitle && <TextItem path={subtitle} className={styles('subtitle')} />}
            </div>
            {infoMessage && <Tooltip text={infoMessage} name="alert-circle-i" size="15px" />}
            {infosRight && <span className={styles('infos-right')}>{infosRight}</span>}
          </div>
        )}
        <div className={styles('content', classContent)}>{children}</div>
        {bottom && <div className={styles('bottom')}>{bottom}</div>}
      </div>
    );
  }
}
