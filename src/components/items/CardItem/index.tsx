import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import CardItem, { StateProps, DispatchProps, OwnProps } from './CardItem';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CardItem);

export default Wrapped;
