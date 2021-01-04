import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import RellaxItem, { StateProps, DispatchProps, OwnProps } from './RellaxItem';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(RellaxItem);

export default Wrapped;
