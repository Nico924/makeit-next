import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import About, { StateProps, DispatchProps, OwnProps } from './About';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(About);

export default Wrapped;
