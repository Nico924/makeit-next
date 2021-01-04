import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import BlogItem from 'components/listItems/BlogItem';
import Illustration from 'components/items/Illustration';
import SeoHandler from 'components/global/SeoHandler';
import CustomHubSpotForm from 'components/forms/CustomHubSpotForm';
import CustomButton from 'components/items/CustomButton';
import CtaNewsletter from 'components/items/CtaNewsletter';
import TagItem from 'components/items/TagItem';
import ArrowRight from './assets/arrow-right.svg';
import styleIdentifiers from './job.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type JobProps = StateProps & DispatchProps & OwnProps;

interface JobState {}

export default class Job extends Component<JobProps, JobState> {
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
    const { getAllJob } = this.props;
    getAllJob({ search: filter });
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

    const position = this.jobContainer.getBoundingClientRect();
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
    const { getAllJob } = this.props;
    const { filter } = this.state;
    if (filter && filter === value) {
      this.setState({ filter: null });
      getAllJob();
    } else {
      this.setState({ filter: value });
      getAllJob({ search: value });
    }
  };

  setRef = (node: any, name: string): void => {
    if (node) this[name] = node;
  };

  render() {
    const { jobs, categories, mobile } = this.props;
    const { filter, sticky, heightSearch } = this.state;
    return (
      <div className={styles('Job')}>
        <SeoHandler path="job.home.seo" />
        <section className={styles('top')}>
          <div className={styles('content-title')}>
            <div className={styles('title')}>
              <Illustration illu="star-four" className={styles('star')} />
              <Illustration illu="square-round" className={styles('square')} />
              <TextItem className={styles('title-text')} isHtml path="job.home.title" />
            </div>
          </div>
          <div className={styles('content-subtitle')}>
            <CustomButton
              className={styles('button')}
              label="Become one of them"
              color="grey"
              iconRight={<img src={ArrowRight} alt="arrow" />}
              action={() =>
                this.applyContainer.scrollIntoView({ block: 'center', behavior: 'smooth' })
              }
            />
            <CustomButton
              className={styles('button')}
              label="Apply now"
              color="pink"
              action={() =>
                this.applyContainer.scrollIntoView({ block: 'center', behavior: 'smooth' })
              }
            />
          </div>
        </section>
        <section ref={(e): void => this.setRef(e, 'jobContainer')} className={styles('blog')}>
          <div
            ref={(e): void => this.setRef(e, 'searchBar')}
            className={styles('search', sticky && 'sticky')}
          >
            <div className={styles('item-container')}>
              {categories &&
                Object.values(categories).map((item, key) => (
                  <TagItem
                    className={styles('item', filter === item.label && 'active')}
                    key={key}
                    action={(): void => this.addFilter(item.label)}
                    categorie={item.value}
                    list="jobCategories"
                  />
                ))}
            </div>
          </div>
          <div className={styles('list-container')}>
            <div
              className={styles('blog-list')}
              style={sticky && !mobile ? { paddingTop: `${heightSearch + 60}px` } : {}}
            >
              {jobs.loading && <div className={styles('loading')}>Loading ...</div>}
              {jobs &&
                jobs.data &&
                jobs.data.map(
                  (item, key): JSX =>
                    key === 3 ? (
                      <>
                        <BlogItem type="jobs" key={key} data={item} readText="Read Job Offer" />
                        <CtaNewsletter
                          emailInputId="email#2"
                          className={styles('newsletter')}
                          colorButton="pink"
                          noLetter
                          title="job.General.cta.title"
                        />
                      </>
                    ) : (
                      <BlogItem
                        noLetter
                        type="jobs"
                        key={key}
                        data={item}
                        readText="Read Job Offer"
                      />
                    ),
                )}
              {jobs.data && jobs.data.length < 4 && (
                <CtaNewsletter
                  emailInputId="email#2"
                  colorButton="pink"
                  noMargin
                  noLetter
                  className={styles('newsletter', 'no-margin')}
                />
              )}
            </div>
          </div>
        </section>
        <section className={styles('apply')} ref={(e): void => this.setRef(e, 'applyContainer')}>
          <div className={styles('apply-container')}>
            <div className={styles('title')}>
              <TextItem path="job.General.apply.title" />
            </div>
            <div className={styles('form-container')}>
              <CustomHubSpotForm
                colorButton="yellow"
                portalId="3047087"
                formId="f06d39cf-0a2f-4616-900a-6c36b322c17b"
                colorError="red"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
