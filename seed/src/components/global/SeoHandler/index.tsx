import * as React from 'react';
import { getContent, testPrimitive } from 'store/utils/helper';
import { content as localeContent } from 'config/content';
import { Helmet } from 'react-helmet';
import window from 'global/window';
import { useSelector } from 'react-redux';

export interface StateProps {
  content: {};
  lg: string;
}

export interface DispatchProps {}

export interface OwnProps {
  contentProp: {};
  title: string[] | string;
  description: string[] | string;
  keywords: string[] | string;
  path: string[] | string;
  replace: {};
  // if seo is not pass from content path but directly from page eg : { title : ... }
  obj: {};
  object: {};
  // Work only if props object is passed & object have no different languages eg : { title: 'blalbal' } and no /!\ { title: { fr: 'balbal' }}
  noTranslate: boolean;
  // remove index of page
  noIndex: boolean;
  image: {};
}

export type SeoHandlerProps = StateProps & DispatchProps & OwnProps;

interface SeoHandlerState {}

export const SeoHandler = (props: SeoHandlerProps) => {
  let { title, description, keywords, thumbnail, path } = props;

  const {
    contentProp,
    replace,
    object,
    noTranslate,
    noIndex,
    image,
    imageWidth,
    imageHeight,
  } = props;

  const lg = useSelector(state => state.content.lg);
  const content = useSelector(state => state.content.raw);

  let { obj } = props;

  obj = obj || object;

  if (path) {
    if (typeof path === 'string') {
      path = path.split('.');
    }
    title = path.slice(0);
    title.push('title');
    description = path.slice(0);
    description.push('description');
    keywords = path.slice(0);
    keywords.push('keywords');
    thumbnail = path.slice(0);
    thumbnail.push('thumbnail');
  }

  title =
    (title && getContent(content, title, lg, replace)) ||
    (contentProp && getContent(contentProp, 'seo.title', lg, replace)) ||
    getContent(localeContent, 'seo.title', lg, replace);

  description =
    (description && getContent(content, description, lg, replace)) ||
    (contentProp && getContent(contentProp, 'seo.description', lg, replace)) ||
    getContent(localeContent, 'seo.description', lg, replace);
  keywords =
    (keywords && getContent(content, keywords, lg, replace)) ||
    (contentProp && getContent(contentProp, 'seo.keywords', lg, replace)) ||
    getContent(localeContent, 'seo.keywords', lg, replace);

  thumbnail =
    (thumbnail && getContent(content, thumbnail, lg, replace)) ||
    (contentProp && getContent(contentProp, 'seo.thumbnail', lg, replace)) ||
    getContent(localeContent, 'seo.thumbnail', lg, replace);

  if (obj) {
    title = noTranslate ? obj.title : obj.title && obj.title[lg];
    description = noTranslate ? obj.description : obj.description && obj.description[lg];
    if (obj.keywords) keywords = noTranslate ? obj.keywords : obj.keywords && obj.keywords[lg];
    else keywords = '';
  }

  if (!thumbnail || (thumbnail && !thumbnail.src)) {
    thumbnail =
      image ||
      (obj &&
        obj.thumbnail &&
        (obj.thumbnail.large || obj.thumbnail.medium || obj.thumbnail.small));
  } else {
    thumbnail = thumbnail.src.large || thumbnail.src.medium || thumbnail.src.small || thumbnail.src;
  }

  const useTitle = testPrimitive(title);
  const useDescription = testPrimitive(description);
  const useKeywords = testPrimitive(keywords);
  const useThumbnail = thumbnail;

  const canonicalUrl =
    window && window.location && window.location.origin + window.location.pathname;

  return (
    <Helmet>
      {useTitle && <title>{title}</title>}
      {useDescription && <meta name="description" content={description} />}
      {useKeywords && <meta name="keywords" content={keywords} />}

      {useThumbnail && <meta property="og:image" content={thumbnail} />}
      {useThumbnail && <meta property="og:image:width" content={imageWidth || '1200'} />}
      {useThumbnail && <meta property="og:image:height" content={imageHeight || '630'} />}

      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {useTitle && <meta property="og:title" content={title} />}
      {useDescription && <meta property="og:description" content={description} />}

      {noIndex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};

export default SeoHandler;
