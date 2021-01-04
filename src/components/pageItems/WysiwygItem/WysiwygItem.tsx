import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import parse, { domToReact } from 'html-react-parser';
import QuoteArticleItem from 'components/pageItems/QuoteArticleItem';
import VideoArticleItem from 'components/pageItems/VideoArticleItem';
import CtaNewsletter from 'components/items/CtaNewsletter';
import styleIdentifiers from './wysiwygItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  content: string;
}

export type WysiwygItemProps = StateProps & DispatchProps & OwnProps;

const WysiwygItem = (props: WysiwygItemProps) => {
  const { content } = props;

  function removeStyle(toRemove) {
    for (let index = 0; index < toRemove.length; index++) {
      const element = toRemove[index];
      if (element && element.attribs && element.attribs.style) {
        element.attribs.style = null;
      }
    }

    return toRemove;
  }

  function renderContent(): JSX {
    let newContent = content;
    newContent = newContent.replace(/<blockquote>/g, "<blockquote class='quote'>");
    newContent = newContent.replace(/<figure class="image"/g, '<figure');
    newContent = newContent.replace(/<img/g, '<img class="image"');
    newContent = newContent.replace(/&lt;CTA_Email /g, '<span data="cta_email"');

    const options = {
      replace: ({ attribs, children }): JSX => {
        if (attribs && attribs.data === 'cta_email') {
          return (
            <CtaNewsletter
              emailInputId="email#article"
              article
              withCheckkbox={false}
              withInfo
              subtitle="blog.general.cta.subtitle"
            />
          );
        }
        if (attribs && attribs.style) attribs.style = '';
        if (attribs && attribs.class === 'quote') {
          children = removeStyle(children);
          return <QuoteArticleItem>{domToReact(children)}</QuoteArticleItem>;
        }
        if (attribs && attribs.class === 'media') {
          return <VideoArticleItem video={children[0].attribs.url} />;
        }
        if (attribs && attribs.class === 'image') {
          return (
            <div className={styles('image-article')}>
              <img src={attribs.src} alt={attribs.alt || 'image-article'} />
            </div>
          );
        }
      },
    };

    return parse(newContent, options);
  }

  return <div className={styles('WysiwygItem')}>{renderContent()}</div>;
};

export default WysiwygItem;
