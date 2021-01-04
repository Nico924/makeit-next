import React, { Component } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import CtaNewsletter from 'components/items/CtaNewsletter';
import SeoHandler from 'components/global/SeoHandler';
import BlogItem from 'components/listItems/BlogItem';
import Loading from 'components/items/Loading';
import SharingBlock from 'components/pageItems/SharingBlock';
import TagItem from 'components/items/TagItem';
import WysiwygItem from 'components/pageItems/WysiwygItem';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './blogArticle.scss';

// assets
import halfCarrePink from './assets/halfCarrePink.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type BlogArticleProps = StateProps & DispatchProps & OwnProps;

interface BlogArticleState {}

export default class BlogArticle extends Component<BlogArticleProps, BlogArticleState> {
  componentDidMount(): void {
    const {
      match: { params },
      article,
      lg,
    } = this.props;

    if (
      !article ||
      (article && !article.data) ||
      (article.data && article.data.urls[lg] !== params.id)
    ) {
      this.loadArticle();
    }
  }

  componentDidUpdate(prevProps): void {
    const {
      match: { params },
    } = this.props;
    if (prevProps.match.params.id !== params.id) {
      this.loadArticle();
    }
  }

  loadArticle = (): void => {
    const {
      getArticle,
      getRelated,
      match: { params },
      lg,
    } = this.props;

    getArticle({
      data: { url: params.id, lg },
      callback: (res): Record<string, any> => {
        getRelated({ data: { categories: [res.getCategories[0]._id] } });
      },
    });
  };

  render(): JSX {
    const { article, related, lg } = this.props;
    return (
      <div className={styles('BlogArticle')}>
        <img src={halfCarrePink} alt="shape" className={styles('half_carre_pink')} />
        {article && article.loading && !article.loaded && (
          <>
            <div className={styles('top')} />
            <div className={styles('loading', 'content')}>
              <div className={styles('article')}>
                <Loading className={styles('image-loading')} />
              </div>
            </div>
          </>
        )}
        {article && article.data && (
          <>
            {article.data.seo && <SeoHandler object={article.data.seo} />}
            <div className={styles('top')}>
              <div className={styles('info')}>
                <TagItem
                  categorie={article.data.getCategories[0].title}
                  indicColor={article.data.getCategories[0].colorCode}
                />
                <div className={styles('date')}>
                  {`— ${moment(article.data.publicationDate).format('LL')}`}
                </div>
              </div>
              <div className={styles('title')}>
                <TextItem path={article.data.title} />
              </div>
            </div>
            <div className={styles('content')}>
              <div className={styles('article')}>
                {typeof window !== 'undefined' && (
                  <SharingBlock
                    className={styles('share-container')}
                    containerClassName={styles('share-sticky')}
                    url={window.location.href}
                    back="/blog"
                  />
                )}
                <WysiwygItem content={article.data.content[lg]} />
                <div className={styles('cta')}>
                  <CtaNewsletter
                    emailInputId="email#article"
                    colorButton="pink"
                    article
                    withCheckkbox={false}
                    withInfo
                    subtitle="blog.general.cta.subtitle"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {related && related.data && related.data.length !== 0 && (
          <div className={styles('related')}>
            <div className={styles('related-container')}>
              <div className={styles('related-title')}>Related Posts</div>
              <div className={styles('related-post')}>
                {related.data.slice(0, 2).map(
                  (item, key): JSX => (
                    <BlogItem type="blog" key={key} data={item} />
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
