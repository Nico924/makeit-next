import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import RightSub, { StateProps, DispatchProps, OwnProps } from './RightSub';

const mapStateToProps = (state: StoreState): object => ({
  mobile: state.app.isMobile,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(RightSub);

export default Wrapped;
