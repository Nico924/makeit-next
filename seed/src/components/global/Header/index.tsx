import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import app from 'store/app';
import Header, { StateProps, DispatchProps, OwnProps } from './Header';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  showSideMenu: app.actions.sideMenu.show.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default Wrapped;
