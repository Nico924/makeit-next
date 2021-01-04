import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import BlogItem from 'components/listItems/BlogItem';
import Illustration from 'components/items/Illustration';
import CtaNewsletter from 'components/items/CtaNewsletter';
import SeoHandler from 'components/global/SeoHandler';
import TagItem from 'components/items/TagItem';
import styleIdentifiers from './blog.scss';

import Thumbnail from './assets/thumbnail.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type BlogProps = StateProps & DispatchProps & OwnProps;

interface BlogState {}

export default class Blog extends Component<BlogProps, BlogState> {
  constructor(props) {
    super(props);

    this.state = {
      filter: null,
      sticky: false,
      heightSearch: 0,
    };
  }

  componentDidMount(): void {
    const { filter } = this.state;
    const { getAllArticles, loadCategories } = this.props;
    getAllArticles({ search: filter });
    loadCategories();
    document.addEventListener('scroll', this.handleScroll);
    if (this.searchBar) {
      const height = this.searchBar.getBoundingClientRect().height;
      if (height) this.setState({ heightSearch: height });
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (): void => {
    const { sticky } = this.state;

    const position = this.blogContainer.getBoundingClientRect();
    if (position.top && position.top <= 0) {
      if (!sticky) {
        this.setState({ sticky: true });
      }
    }

    if (position.top && position.top > 0) {
      if (sticky) this.setState({ sticky: false });
    }
  };

  addFilter = (value: string): void => {
    const { getAllArticles } = this.props;
    const { filter } = this.state;
    const data = {
      pagination: { limit: 100, skip: 0, sort: 'publicationDate DESC' },
    };

    if (!filter || filter !== value) {
      this.setState({ filter: value });
      data.categories = [value];
    } else {
      this.setState({ filter: null });
    }

    const output = [];

    getAllArticles({
      data,
      output,
    });
  };

  setRef = (node: any, name: string): void => {
    if (node) this[name] = node;
  };

  render() {
    const { articles, categories, mobile } = this.props;
    const { filter, sticky, heightSearch } = this.state;

    return (
      <div className={styles('Blog')}>
        <SeoHandler path="blog.general.seo" image={Thumbnail} />
        <section className={styles('top')}>
          <div className={styles('content-title')}>
            <div className={styles('title')}>
              <Illustration illu="badge-free" className={styles('badge')} />
              <Illustration illu="thinking" className={styles('think')} />
              <TextItem isHtml path="blog.home.title" />
            </div>
          </div>
          <div className={styles('content-title')}>
            <div className={styles('subtitle')}>
              <TextItem isHtml path="blog.home.subtitle" />
            </div>
          </div>
          <div className={styles('form')}>
            <CtaNewsletter emailInputId="email#1" withInfo simple colorButton="pink" />
          </div>
        </section>
        <section ref={(e): void => this.setRef(e, 'blogContainer')} className={styles('blog')}>
          <div
            ref={(e): void => this.setRef(e, 'searchBar')}
            className={styles('search', sticky && 'sticky')}
          >
            <div className={styles('item-container')}>
              {categories &&
                categories.data &&
                categories.data.map((item, key) => (
                  <TagItem
                    className={styles('item', filter === item._id && 'active')}
                    key={key}
                    action={(): void => this.addFilter(item._id)}
                    categorie={item.title}
                    indicColor={item.colorCode}
                  />
                ))}
            </div>
          </div>
          <div className={styles('list-container')}>
            <div
              className={styles('blog-list')}
              style={sticky && !mobile ? { paddingTop: `${heightSearch + 60}px` } : {}}
            >
              {articles && articles.loading && <div className={styles('loading')}>Loading ...</div>}
              {articles &&
                articles.data &&
                articles.data.map(
                  (item, key): JSX => (
                    <React.Fragment key={key}>
                      <BlogItem type="blog" data={item} />
                    </React.Fragment>
                  ),
                )}
              <CtaNewsletter
                emailInputId="email#2"
                colorButton="pink"
                noMargin
                className={styles('newsletter', 'no-margin')}
                subtitle="blog.general.cta.subtitle"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
