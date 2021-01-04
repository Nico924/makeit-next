import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import app from 'store/app';
import view from 'store/view';
import { withRouter } from 'react-router-dom';
import Main, { StateProps, DispatchProps, OwnProps } from './Main';

const mapStateToProps = (state: StoreState): Record<string, any> => ({
  ready: state.app.ready,
  session: state.session.data,
  loading: state.view.loading,
  mobile: state.app.isMobile,
  hideHeader: state.view.hideHeader,
  stickyHeader: state.view.stickyHeader,
});

const mapDispatchToProps = {
  bootup: app.actions.bootup.request.action,
  fakeLoading: view.actions.fakeLoading.action,
  setMobile: app.actions.mobile.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default withRouter(Wrapped);
