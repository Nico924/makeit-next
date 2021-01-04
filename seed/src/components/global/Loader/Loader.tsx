import * as React from 'react';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group'; // ES6
import { animationClassList } from 'store/utils/view';
import { config } from 'config/general';
import Loading from 'components/items/Loading';
import styleIdentifiers from './loader.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  loader: {};
  active: boolean;
}

export interface DispatchProps {}

export interface OwnProps {
  dark?: boolean;
  className: string;
  backgroundClassName: string;
}

export type LoaderProps = StateProps & DispatchProps & OwnProps;

interface LoaderState {}

export default class Loader extends React.Component<LoaderProps, LoaderState> {
  render(): JSX {
    const { loader, dark, className, backgroundClassName } = this.props;
    return (
      <CSSTransition
        in={loader.active}
        appear
        classNames={animationClassList('fade', styles)}
        timeout={400}
      >
        <div className={styles('Loader', className)}>
          <div className={styles('background', dark && 'dark', backgroundClassName)} />
          <div className={styles('loading')}>
            <Loading loader={config.loader} />
          </div>
        </div>
      </CSSTransition>
    );
  }
}
