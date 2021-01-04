import { connect } from 'react-redux';
import app from 'store/app';
import { StoreState } from 'store/rootReducer';
import Modal, { StateProps, DispatchProps, OwnProps } from './Modal';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = { dialogHide: app.actions.dialog.hide.action };

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

export default Wrapped;
