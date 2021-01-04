import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import SideMenus, { StateProps, DispatchProps, OwnProps } from './SideMenus';

const mapStateToProps = (state: StoreState): Object => ({
  sideMenus: state.app.sideMenus,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenus);

export default Wrapped;
