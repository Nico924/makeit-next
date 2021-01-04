import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import BusinessPrototypingMain, {
  StateProps,
  DispatchProps,
  OwnProps,
} from './BusinessPrototypingMain';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessPrototypingMain);

export default Wrapped;
