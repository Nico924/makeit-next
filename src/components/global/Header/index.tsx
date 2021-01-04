import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import app from 'store/app';
import auth from 'store/auth';

import Header, { StateProps, DispatchProps, OwnProps } from './Header';

interface StoreProps {
  session: Record<string, any>;
}

const mapStateToProps = (state: StoreState) => ({
  session: state.session.data,
  headerLarge: state.view.header,
  smallHeader: state.view.smallHeader,
  mobile: state.app.isMobile,
});

const mapDispatchToProps = {
  logout: auth.actions.logout.request.action,
  dialogShow: app.actions.dialog.show.action,
  dialogHide: app.actions.dialog.hide.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default Wrapped;
