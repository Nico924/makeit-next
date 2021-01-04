import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import newsletter from 'store/newsletter';

import CtaNewsletter, { StateProps, DispatchProps, OwnProps } from './CtaNewsletter';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {
  subscribeNewsletter: newsletter.actions.subscribe.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CtaNewsletter);

export default Wrapped;
