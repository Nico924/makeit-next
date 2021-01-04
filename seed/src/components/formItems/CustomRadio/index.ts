import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import CustomRadio, { StateProps, DispatchProps, OwnProps } from './CustomRadio';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CustomRadio);

export default Wrapped;
