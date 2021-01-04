import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ProjectRadio, { StateProps, DispatchProps, OwnProps } from './ProjectRadio';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectRadio);

export default Wrapped;
