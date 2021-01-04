import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import CustomSelect, { StateProps, DispatchProps, OwnProps } from './CustomSelect';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CustomSelect);

export default Wrapped;
