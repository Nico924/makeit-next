import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Main, { StateProps, DispatchProps, OwnProps } from './Main';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default Wrapped;
