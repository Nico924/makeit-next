import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';

import Home, { StateProps, DispatchProps, OwnProps } from './Home';

const mapStateToProps = (state: StoreState): object => ({
  alreadyMounted: state.view.homeIsMount,
  mobile: state.app.isMobile,
  stickyHeader: state.view.stickyHeader,
  content: state.content.raw,
});

const mapDispatchToProps = {
  toggleHeader: view.actions.toggleHeader.action,
  setHomeMounted: view.actions.homeMounted.action,
  setStickyHeader: view.actions.stickyHeader.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Wrapped;
