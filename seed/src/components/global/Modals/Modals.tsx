import * as React from 'react';
import Modal from 'components/global/Modal';

export interface StateProps {
  dialogs: {};
}

export interface DispatchProps {}

export interface OwnProps {}

export type ModalsProps = StateProps & DispatchProps & OwnProps;

interface ModalsState {}

export default class Modals extends React.Component<ModalsProps, ModalsState> {
  render(): JSX {
    const { dialogs, ...rest } = this.props;
    return (
      <React.Fragment>
        {Object.keys(dialogs).map(
          (key): JSX => (
            <Modal {...rest} dialog={{ ...dialogs[key] }} key={key} id={key} />
          ),
        )}
      </React.Fragment>
    );
  }
}
