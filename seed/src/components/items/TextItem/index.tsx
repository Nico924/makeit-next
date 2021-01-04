import React from 'react';
import classNames from 'classnames/bind';
import find from 'lodash/find';
import { content as localeContent } from 'config/content';
import {
  getContent,
  getTranslatedContent,
  testPrimitive,
  handleReplace,
  compareItems,
} from 'store/utils/helper';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const styles = classNames.bind({});

// Exemple usage
// <TextItem path="lists.genders" item={value} />
// => take the list genders (from content) et retrieve the right element using
// item (= value = key in the list genders)
// and then return the value in the appropriate language
// <TextItem path="path.to.direct.content" />
// => take the object into the path and then return the value in the appropriate language
// <TextItem path="something" /> : return 'something'

// You can also provide a replace object so that the key prefixed by a dollars
// into the returned value a replaced with the value replace[key]
// Ex: <TextItem path"path.to.direct.content" replace={{'value':'cool'}} />
// without replace TextItem could return "This car is $value"
// with the replace object => "This car is cool"

export interface StateProps {
  lg: string;
  content: {} | null;
}

export interface DispatchProps {}

export interface OwnProps {
  action: Function;
  onClick: Function;
  className: string;
  path: string | string[];
  item: number | boolean | string | {};
  isHtml: boolean;
  replace: {};
  list: string[] | object[];
  style: {};
  dataCta: string;
  dataCtaValue?: string;
  id: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'i' | 'div' | 'span';
}

export type TextItemProps = StateProps & DispatchProps & OwnProps;

const TextItem = (props: TextItemProps) => {
  const {
    tag,
    className,
    isHtml,
    action,
    onClick,
    style,
    dataCta,
    id,
    dataCtaValue,
    item,
    list,
    path,
    replace,
  } = props;

  const lg = useSelector(state => state.content.lg);
  const content = useSelector(state => state.content.raw);

  const syncContent = (contentPath: string) => {
    if (
      typeof contentPath === 'string' &&
      contentPath.indexOf('.') >= 0 &&
      !contentPath.match(/\s/)
    )
      console.warn('TODO: add in content', contentPath);
  };

  const handleContent = (contentPath: string | string[], sync: boolean = true): string => {
    let contentItem = content && getContent(content, contentPath, lg);

    if (!contentItem) {
      contentItem = getContent(localeContent, contentPath, lg);
    }

    if (!contentItem && sync) {
      // syncContent(contentPath);
    }

    return contentItem;
  };

  const replaceInTxt = (txt?: string): JSX => {
    if (txt === undefined) {
      return false;
    }

    // For keys in replace : replace key = handleContent (resplace key)
    if (replace) {
      const replaceObj = {};
      const keys = Object.keys(replace);

      keys.forEach(function(key) {
        const replacePath = replace[key];

        const replaceValue = handleContent(replacePath, false);

        if (replaceValue) replaceObj[key] = replaceValue;
        else replaceObj[key] = replacePath;
      });

      txt = handleReplace(txt, replaceObj);
    }

    if (isHtml) {
      if (tag === 'none') return parse(txt);
      return (
        <div className={styles('TextItem', className)} style={style}>
          {parse(txt)}
        </div>
      );
    }

    const itemProps = {
      onClick: action || onClick,
      'data-cta': dataCta,
      id,
      className: styles('TextItem', className),
      style,
      'data-cta-value': dataCtaValue,
    };

    if (tag === 'h1') {
      return <h1 {...itemProps}>{txt}</h1>;
    }
    if (tag === 'h2') {
      return <h2 {...itemProps}>{txt}</h2>;
    }
    if (tag === 'h3') {
      return <h3 {...itemProps}>{txt}</h3>;
    }
    if (tag === 'h4') {
      return <h4 {...itemProps}>{txt}</h4>;
    }
    if (tag === 'h5') {
      return <h5 {...itemProps}>{txt}</h5>;
    }
    if (tag === 'h6') {
      return <h6 {...itemProps}>{txt}</h6>;
    }
    if (tag === 'div') {
      return <div {...itemProps}>{txt}</div>;
    }
    if (tag === 'p') {
      return <p {...itemProps}>{txt}</p>;
    }
    if (tag === 'i') {
      return <i {...itemProps}>{txt}</i>;
    }
    if (tag === 'strong') {
      return <strong {...itemProps}>{txt}</strong>;
    }
    if (tag === 'none') {
      return txt;
    }
    return <span {...itemProps}>{txt}</span>;
  };

  const getValueFromList = (listItems: object[], value: {} | string): {} => {
    const val = find(
      listItems,
      (listItem): void => compareItems(listItem, value) || compareItems(listItem, value, 'label'),
    );
    return val;
  };

  const extractText = (): string => {
    let contentItem;
    // path to find a single object in the content gathering everything
    // if a list is at the end of the path =>
    // an additional value is provided to retrieve to right object
    if (path !== undefined) {
      // If no path found in the getContent => contentResult become path
      const contentResult = handleContent(path);

      // item given is a string
      if (Array.isArray(contentResult) && item) {
        contentItem = getValueFromList(contentResult, item);
        if (!contentItem) contentItem = item;
      }
      // Content result can still be a list or a string
      else if (typeof contentResult === 'object' && item) {
        // Test 1 : get the object
        contentItem = contentResult[item];
        // Test 2 : (case object with { 0: ..., 1: ..., ... })
        if (!contentItem) {
          const values = Object.values(contentResult);
          contentItem = getValueFromList(values, item);
        }
        if (!contentItem) contentItem = item;
      } else if (contentResult !== undefined) {
        contentItem = contentResult;
      } else {
        // no longer used if path is in the form of path.to.something
        // eslint-disable-next-line no-lonely-if
        if (Array.isArray(path) && item) {
          contentItem = item;
        } else {
          contentItem = Array.isArray(path) ? path.join && path.join() : path;
        }
      }
    }
    // list is directly provided and item is a value
    else if (list && item !== undefined) {
      contentItem = getValueFromList(list, item);
      // Display something if no matching
      if (!contentItem && testPrimitive(item)) {
        contentItem = item;
      }
    }
    // Item with content is directly provided (as object) (for custom select)
    else if (item !== undefined) {
      contentItem = item;
    }
    // At this point, contentItem is an object with languages keys (key can be precise as a parameter) or direct a string
    // Ex: {
    //  'fr':...,
    //  'en':...
    // }
    if (contentItem !== undefined) {
      // if no key or lg or defaultLg value in the object, test : text, value, name and val
      let contentTxt = '';
      if (testPrimitive(contentItem)) contentTxt = contentItem;
      else {
        contentItem = getTranslatedContent(contentItem, lg);
        if (testPrimitive(contentItem)) contentTxt = contentItem;
        else if (typeof contentItem === 'object') {
          contentTxt =
            contentItem.text ||
            contentItem.description ||
            contentItem.name ||
            contentItem.label ||
            contentItem.value ||
            contentItem.val;

          // here we have the field in the content but it is empty
          // We avoid displaying the label because it can be on purpose
          if (contentItem.label && contentItem.type === 'input') {
            console.warn('Empty content', path, contentItem.label);
            contentTxt = '';
          }
        }
      }
      if (testPrimitive(contentTxt)) {
        contentTxt = contentTxt && contentTxt.toString();
        return contentTxt;
      }
    }
    return '';
  };

  const txt = extractText();

  if (txt !== undefined) return replaceInTxt(txt);
  return false;
};

export default TextItem;
