import { connect } from 'react-redux';
import app from 'store/app';
import { StoreState } from 'store/rootReducer';
import SideMenu, { StateProps, DispatchProps, OwnProps } from './SideMenu';

const mapStateToProps = (state: StoreState): Object => ({});

const mapDispatchToProps = {
  sideMenuHide: app.actions.sideMenu.hide.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);

export default Wrapped;
