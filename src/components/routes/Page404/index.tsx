import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Page404, { StateProps, DispatchProps, OwnProps } from './Page404';

const mapStateToProps = (state: StoreState): Object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Page404);

export default Wrapped;
