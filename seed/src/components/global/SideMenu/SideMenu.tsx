import * as React from 'react';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group'; // ES6
import { animationClassList } from 'store/utils/view';

import styleIdentifiers from './sideMenu.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  dialogs: {};
}

export interface DispatchProps {
  sideMenuHide: Function;
}

export interface OwnProps {
  sideMenu: {};
  appear: boolean;
}

export type SideMenuProps = StateProps & DispatchProps & OwnProps;

interface SideMenuState {}

export default class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
    // this.SortItem()
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: {}): void => {
    const { sideMenu, sideMenuHide } = this.props;

    if (event.key === 'Escape') {
      if (sideMenu.active) {
        sideMenuHide(sideMenu.id);
      }
    }
  };

  hide = (): void => {
    const { sideMenu, sideMenuHide } = this.props;

    if (!sideMenu.noBackgroundClose) sideMenuHide(sideMenu.id);

    if (sideMenu.close && typeof sideMenu.close === 'function') sideMenu.close();
  };

  render(): JSX {
    const { sideMenu, appear } = this.props;

    return (
      <div>
        {sideMenu && (
          <CSSTransition
            in={sideMenu.active || false}
            timeout={400}
            appear={appear}
            unmountOnExit={sideMenu.unmount || !sideMenu.noUnmount}
            classNames={animationClassList('side', styles)}
          >
            <div
              className={styles('SideMenu', sideMenu.id)}
              style={{
                zIndex: sideMenu.zIndex,
              }}
            >
              <div className={styles('background')} onClick={(): void => this.hide()} />
              <div
                className={styles(
                  'menu',
                  sideMenu.transparent && 'transparent',
                  sideMenu.demo && 'demo',
                )}
              >
                {sideMenu.content}
              </div>
            </div>
          </CSSTransition>
        )}
      </div>
    );
  }
}
