import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import QuoteArticleItem, { StateProps, DispatchProps, OwnProps } from './QuoteArticleItem';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteArticleItem);

export default Wrapped;
