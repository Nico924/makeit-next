import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import newsletter from 'store/newsletter';

import ParkPlace, { StateProps, DispatchProps, OwnProps } from './ParkPlace';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
});

const mapDispatchToProps = {
  subscribe: newsletter.actions.subscribe.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ParkPlace);

export default Wrapped;
