import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import Button, { StateProps, DispatchProps, OwnProps } from './Button';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export default Wrapped;
