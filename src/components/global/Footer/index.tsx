import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import newsletter from 'store/newsletter';
import app from 'store/app';

import Footer, { StateProps, DispatchProps, OwnProps } from './Footer';

const mapStateToProps = (state: StoreState): object => ({
  latest: state.article.recent,
});

const mapDispatchToProps = {
  subscribe: newsletter.actions.subscribe.request.action,
  dialogShow: app.actions.dialog.show.action,
  dialogHide: app.actions.dialog.hide.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

export default Wrapped;
