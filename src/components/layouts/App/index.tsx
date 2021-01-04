import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';
import app from 'store/app';

import App, { StateProps, DispatchProps, OwnProps } from './App';

const mapStateToProps = (state: StoreState): object => ({
  header: state.view.smallHeader,
});

const mapDispatchToProps = {
  toggleHeader: view.actions.headerBlog.action,
  hideHeader: view.actions.hideHeader.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Wrapped;
