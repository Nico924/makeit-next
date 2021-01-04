import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';
import JobMain, { StateProps, DispatchProps, OwnProps } from './JobMain';

const mapStateToProps = (state: StoreState): Record<string, any> => ({
  header: state.view.smallHeader,
});

const mapDispatchToProps = {
  toggleHeader: view.actions.headerBlog.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(JobMain);

export default Wrapped;
