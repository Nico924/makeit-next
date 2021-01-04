import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import app from 'store/app';

import Staas, { StateProps, DispatchProps, OwnProps } from './Staas';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  dialogShow: app.actions.dialog.show.action,
  dialogHide: app.actions.dialog.hide.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Staas);

export default Wrapped;
