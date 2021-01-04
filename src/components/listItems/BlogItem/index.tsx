import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import { withRouter } from 'react-router-dom';

import BlogItem, { StateProps, DispatchProps, OwnProps } from './BlogItem';

const mapStateToProps = (state: StoreState): object => ({
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = withRouter(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(BlogItem),
);

export default Wrapped;
