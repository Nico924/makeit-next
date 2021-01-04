import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import Modals, { StateProps, DispatchProps, OwnProps } from './Modals';

const mapStateToProps = (state: StoreState): {} => ({
  dialogs: state.app.dialogs,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Modals);

export default Wrapped;
