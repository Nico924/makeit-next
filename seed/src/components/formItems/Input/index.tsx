import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Input, { StateProps, DispatchProps, OwnProps } from './Input';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);

export default Wrapped;
