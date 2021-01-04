import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import SeoHandler from 'components/global/SeoHandler';
import CustomButton from 'components/items/CustomButton';
import styleIdentifiers from './jobThanksPage.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type JobThanksPageProps = StateProps & DispatchProps & OwnProps;

interface JobThanksPageState {}

export default class JobThanksPage extends Component<JobThanksPageProps, JobThanksPageState> {
  componentDidMount(): void {
    const { footerStatus } = this.props;
    footerStatus(true);
  }

  componentWillUnmount(): void {
    const { footerStatus } = this.props;
    footerStatus(false);
  }

  render() {
    return (
      <div className={styles('JobThanksPage')}>
        <SeoHandler path="job.Thanks.seo" noIndex />
        <div className={styles('content')}>
          <div className={styles('title')}>
            <TextItem isHtml path="job.Thanks.title" />
          </div>
          <div className={styles('subtitle')}>
            <TextItem isHtml path="job.Thanks.subtitle" />
          </div>
          <div className={styles('button-container')}>
            <CustomButton
              className={styles('button')}
              action={(): void => history.push('/jobs')}
              color="pink"
              label="job.Thanks.button"
            />
          </div>
        </div>
      </div>
    );
  }
}
