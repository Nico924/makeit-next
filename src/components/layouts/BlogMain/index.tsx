import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';

import BlogMain, { StateProps, DispatchProps, OwnProps } from './BlogMain';

const mapStateToProps = (state: StoreState): Object => ({
  header: state.view.smallHeader,
});

const mapDispatchToProps = {
  toggleHeader: view.actions.headerBlog.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(BlogMain);

export default Wrapped;
