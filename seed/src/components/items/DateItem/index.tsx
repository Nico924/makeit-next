import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import DateItem, { StateProps, DispatchProps, OwnProps } from './DateItem';

const mapStateToProps = (state: StoreState): {} => ({
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(DateItem);

export default Wrapped;
