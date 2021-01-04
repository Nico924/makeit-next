import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Button from 'components/items/Button';
import { CSSTransition } from 'react-transition-group'; // ES6
import { animationClassList } from 'store/utils/view';
import { config } from 'config/general';

import { FaTimesCircle } from 'react-icons/fa';
import styleIdentifiers from './modal.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  dialogHide: Function;
}

export interface OwnProps {
  dialog: {};
  centerOnInfos: boolean;
  bigDisplay: boolean;
}

export type ModalProps = StateProps & DispatchProps & OwnProps;

interface ModalState {}

export default class Modal extends React.Component<ModalProps, ModalState> {
  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
    // this.SortItem()
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: {}): void => {
    const { dialog } = this.props;

    if (event.key === 'Escape') {
      if (dialog.active) {
        this.dialogClose();
      }
    }
  };

  dialogClose = (): void => {
    const { dialogHide, dialog } = this.props;

    dialogHide(dialog.id);

    if (typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog.close && dialog.close.value && typeof dialog.close.value === 'function') {
      dialog.close.value();
    }
  };

  dialogAction = (): void => {
    const { dialogHide, dialog } = this.props;

    dialogHide(dialog.id);

    if (dialog.action && dialog.action.value && typeof dialog.action.value === 'function') {
      dialog.action.value();
    }
  };

  dialogMessages = (messages: object[] | string): JSX => {
    if (Array.isArray(messages)) {
      return (
        <div className={styles('messages')}>
          {messages.map(
            (item, index): JSX => (
              <div key={item.id || index}>
                <TextItem
                  path={
                    item.message ||
                    item[config.errorMessageLabel] ||
                    item[config.errorCodeLabel] ||
                    (typeof item === 'string' ? item : '')
                  }
                />
              </div>
            ),
          )}
        </div>
      );
    }
    return (
      <div className={styles('message')}>
        <TextItem path={messages} />
      </div>
    );
  };

  stopClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
  };

  renderButtons = (): JSX => {
    const { dialog } = this.props;

    if (dialog.close || dialog.action) {
      return (
        <div className={styles('actions')}>
          {!dialog.noClose && (
            <Button
              variable
              color={(dialog.close && dialog.close.color) || 'grey'}
              noMargin
              label={(dialog.close && dialog.close.text) || 'general.buttons.close'}
              action={(): void => this.dialogClose()}
            />
          )}
          {dialog.action && (
            <Button
              variable
              noMargin
              className={styles(dialog.noClose && 'alone')}
              color={dialog.action && dialog.action.color}
              label={(dialog.action && dialog.action.text) || 'general.buttons.confirm'}
              action={(): void => this.dialogAction()}
            />
          )}
        </div>
      );
    }
    return false;
  };

  render(): JSX {
    const { dialog, modalContentClassName, centerOnInfos, bigDisplay } = this.props;

    const noBackgroundClose = dialog.NoBackgroundClose || dialog.noBackgroundClose;

    return (
      <CSSTransition
        in={dialog.active}
        timeout={config.timeoutDialog}
        appear
        unmountOnExit={dialog.unmount || !dialog.noUnmount}
        classNames={animationClassList('modal', styles)}
      >
        <div
          className={styles(
            'Modal',
            dialog.id,
            dialog.above && 'above-all',
            dialog.fitContent && 'common-padding',
          )}
          style={dialog.id !== 'preview' ? dialog.style : null}
          onClick={(): void => !noBackgroundClose && this.dialogClose()}
        >
          {!dialog.hideBackground && (
            <div className={styles('background', dialog.backgroundColor)} />
          )}
          {dialog.id === 'preview' && (
            <img
              className={styles('preview')}
              src={dialog.img || dialog.url || dialog.content}
              alt={dialog.alt || 'preview'}
              style={dialog.style}
            />
          )}
          {dialog.id !== 'preview' && (
            <div
              className={styles(
                'wrapper',
                dialog.large && 'large',
                dialog.medium && 'medium',
                centerOnInfos && 'center',
                modalContentClassName,
                dialog.wrapperClassName,
                bigDisplay && 'big',
                dialog.border && 'border',
                dialog.fitContent && 'fit-content',
              )}
              onClick={this.stopClick}
              style={{ maxWidth: dialog.modalWidth }}
            >
              {dialog.closeButton && (
                <div
                  className={styles('close', dialog.closeButton, dialog.closePosition)}
                  onClick={this.dialogClose}
                >
                  <FaTimesCircle />
                </div>
              )}
              {dialog.children && dialog.children}
              {!dialog.children && (
                <div className={styles(dialog.messageClassName)}>
                  <div className={styles('title')}>
                    <TextItem path={dialog.title} />
                  </div>
                  {this.dialogMessages(dialog.messages)}
                  {this.renderButtons()}
                </div>
              )}
            </div>
          )}
        </div>
      </CSSTransition>
    );
  }
}
