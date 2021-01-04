import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import app from 'store/app';
import job from 'store/job';
import article from 'store/article';
import Menu, { StateProps, DispatchProps, OwnProps } from './Menu';

const mapStateToProps = (state: StoreState): Record<string, any> => ({
  articles: state.article.articles,
  mobile: state.app.isMobile,
  jobs: state.job.list,
  lg: state.content.lg,
});

const mapDispatchToProps = {
  dialogHide: app.actions.dialog.hide.action,
  getAllArticles: article.actions.getArticles.request.action,
  getAllJobs: job.actions.getAll.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

export default Wrapped;
