import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import NewsLetterForm from 'components/forms/NewsLetterForm';
import Illustration from 'components/items/Illustration';
import styleIdentifiers from './ctaNewsletter.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  subscribeNewsletter: Function;
  history: object;
}

export interface OwnProps {
  className: string;
  article: boolean;
  subtitle: string;
  noMargin: boolean;
  simple: boolean;
}

export type CtaNewsletterProps = StateProps & DispatchProps & OwnProps;

interface CtaNewsletterState {}

export default class CtaNewsletter extends Component<CtaNewsletterProps, CtaNewsletterState> {
  render() {
    const { className, article, subtitle, noMargin, simple, title, noLetter, ...rest } = this.props;
    return !simple ? (
      <div className={styles('CtaNewsletter', className, noMargin && 'no-margin')}>
        <div className={styles('top')}>
          {!article && !noLetter && <Illustration illu="letter" className={styles('letter')} />}
          <Illustration illu="letterbox" className={styles('letterbox')} />
          <div className={styles('title')}>
            <TextItem isHtml path={title || 'blog.general.cta.title'} />
          </div>
        </div>
        <div className={styles('bottom', article && 'bottom-article', !simple && 'no-margin-auto')}>
          {console.log(subtitle)}
          {subtitle && (
            <div className={styles('subtitle')}>
              <TextItem isHtml path={subtitle} />
            </div>
          )}
          <NewsLetterForm
            contentClassName={styles('content-form')}
            formId={!simple && 'b0cab1b9-6753-4695-99c3-f109e2deac90'}
            portalId={!simple && '3047087'}
            // withCheckkbox
            {...rest}
          />
        </div>
      </div>
    ) : (
      <NewsLetterForm onSubmit={this.submit} contentClassName={styles('content-form')} {...rest} />
    );
  }
}
