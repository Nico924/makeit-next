import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import SeoHandler from 'components/global/SeoHandler';
import BlogItem from 'components/listItems/BlogItem';
import Loading from 'components/items/Loading';
import SharingBlock from 'components/pageItems/SharingBlock';
import CustomButton from 'components/items/CustomButton';
import CustomHubSpotForm from 'components/forms/CustomHubSpotForm';
import WysiwygItem from 'components/pageItems/WysiwygItem';
import TagItem from 'components/items/TagItem';
import styleIdentifiers from './jobIndividual.scss';

import arrowRight from './assets/arrow-right.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type JobIndividualProps = StateProps & DispatchProps & OwnProps;

interface JobIndividualState {}

export default class JobIndividual extends Component<JobIndividualProps, JobIndividualState> {
  componentDidMount(): void {
    this.loadArticle();
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
      getJob,
      getRelated,
      match: { params },
    } = this.props;

    getJob({
      data: params.id,
      callback: (req): Record<string, any> => {
        getRelated(req._id);
      },
    });
  };

  render(): JSX {
    const { job, related, history } = this.props;
    return (
      <div className={styles('JobIndividual')}>
        {job.loading && !job.loaded && (
          <>
            <div className={styles('top')} />
            <div className={styles('loading', 'content')}>
              <div className={styles('article')}>
                <Loading className={styles('image-loading')} />
              </div>
            </div>
          </>
        )}
        {job.data && (
          <>
            {job.data.seo && <SeoHandler object={job.data.seo} noTranslate />}
            <div className={styles('top')}>
              <div className={styles('info')}>
                {job.data.categories &&
                  job.data.categories.map((item, key) => (
                    <TagItem
                      className={styles('category')}
                      list="jobCategories"
                      categorie={item}
                      key={key}
                    />
                  ))}
              </div>
              <div className={styles('title')}>{job.data.title}</div>
              <div className={styles('back')}>
                <CustomButton
                  color="grey"
                  label="job.General.back"
                  className={styles('button-back')}
                  action={() => history.push('/jobs')}
                  iconLeft={<img src={arrowRight} alt="arrow" />}
                />
              </div>
            </div>
            <div className={styles('content')}>
              <div className={styles('article')}>
                {typeof window !== 'undefined' && (
                  <SharingBlock
                    className={styles('share-container')}
                    containerClassName={styles('share-sticky')}
                    url={window.location.href}
                    noBack
                  />
                )}
                <WysiwygItem content={job.data.description} />
              </div>
            </div>
          </>
        )}
        {related.data && related.data.length !== 0 && (
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
        <div className={styles('apply')}>
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
        </div>
      </div>
    );
  }
}
