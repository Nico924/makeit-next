import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import article from 'store/article';
import BlogArticle, { StateProps, DispatchProps, OwnProps } from './BlogArticle';

const mapStateToProps = (state: StoreState): object => ({
  article: state.article.detail,
  related: state.article.related,
  lg: state.content.lg,
});

const mapDispatchToProps = {
  getArticle: article.actions.getOneArticle.request.action,
  getRelated: article.actions.getRelatedArticles.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(BlogArticle);

export default Wrapped;
