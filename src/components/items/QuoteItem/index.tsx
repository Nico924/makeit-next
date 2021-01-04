import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import QuoteItem, { StateProps, DispatchProps, OwnProps } from './QuoteItem';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteItem);

export default Wrapped;
