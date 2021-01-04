import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import TextItemList, { StateProps, DispatchProps, OwnProps } from './TextItemList';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TextItemList);

export default Wrapped;
