import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import TextInput, { StateProps, DispatchProps, OwnProps } from './TextInput';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TextInput);

export default Wrapped;
