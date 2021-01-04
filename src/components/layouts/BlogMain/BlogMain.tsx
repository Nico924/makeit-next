import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Blog from 'components/routes/Blog';
import BlogArticle from 'components/routes/BlogArticle';
import ThanksPageBlog from 'components/routes/ThanksPageBlog';
import styleIdentifiers from './blogMain.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type BlogMainProps = StateProps & DispatchProps & OwnProps;

const BlogMain = (props: BlogMainProps) => {
  return (
    <div className={styles('BlogMain')}>
      <Switch>
        <Route path="/blog/thank-you-blog" component={ThanksPageBlog} />
        <Route path="/blog/:id" component={BlogArticle} />
        <Route component={Blog} />
      </Switch>
    </div>
  );
};

export default BlogMain;
