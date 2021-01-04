import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import article from 'store/article';

import Blog, { StateProps, DispatchProps, OwnProps } from './Blog';

const mapStateToProps = (state: StoreState): object => ({
  articles: state.article.articles,
  mobile: state.app.isMobile,
  categories: state.article.categories,
});

const mapDispatchToProps = {
  getAllArticles: article.actions.getArticles.request.action,
  loadCategories: article.actions.getCategories.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Blog);

export default Wrapped;
