import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';

import ThanksPageBlog, { StateProps, DispatchProps, OwnProps } from './ThanksPageBlog';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {
  footerStatus: view.actions.hideFooterCta.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThanksPageBlog);

export default Wrapped;
