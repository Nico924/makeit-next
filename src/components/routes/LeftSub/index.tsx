import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import newsletter from 'store/newsletter';
import LeftSub, { StateProps, DispatchProps, OwnProps } from './LeftSub';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {
  subscribe: newsletter.actions.subscribe.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LeftSub);

export default Wrapped;
