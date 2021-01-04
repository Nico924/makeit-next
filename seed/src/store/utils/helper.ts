import get from 'lodash/get';
import find from 'lodash/find';
import keyBy from 'lodash/keyBy';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import template from 'lodash/template';
import checkEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import { content } from 'config/content';
import { config } from 'config/general';
import moment from 'moment';
import uniqid from 'uniqid';

import words from 'lodash/words';
/**
 * Helper functions
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstLowerCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function uppercase(str: string): string {
  return str.toUpperCase();
}

export function isOdd(num) {
  if (num % 2 === 0) {
    return false;
  }
  return true;
}

export function testPrimitive(any: any): boolean {
  if (!any) return true;
  return typeof any === 'string' || typeof any === 'number' || typeof any === 'boolean';
}
/**
 * Util functions
 */
export const getTranslatedContent = (obj: {} | string, lg?: string): string => {
  if (typeof obj === 'object') {
    return obj[lg] || (config.defaultLanguage && obj[config.defaultLanguage]) || obj;
  }
  return obj;
};

export const handleReplace = (txt?: string, replaceObj?: {}): string => {
  if (!replaceObj || !txt) {
    return txt;
  }

  if (txt && txt.includes('<%=')) {
    txt = template(txt)(replaceObj);
    return txt;
  }

  const keys = replaceObj && Object.keys(replaceObj);
  if (replaceObj && keys && keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      txt = txt.split(`$${key}`).join(replaceObj[key]);
    }
  }

  return txt;
};

/**
 * @deprecated use lodash/camelCase instead
 * @param text string to put in camelCase
 * @return {string} the camelCase text
 */
export const camelize = (text: string): string => {
  return (
    text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      // eslint-disable-next-line
    .replace(/[\s\.\-_]+/g, '')
  );
};

export const getContent = (
  contentObj: {},
  path: string | string[],
  lg?: string,
  replaceObj?: {},
): string | any[] => {
  if (!contentObj) {
    return false;
  }

  let txt = get(contentObj, path);

  txt = txt ? getTranslatedContent(txt, lg) : txt;
  txt = typeof txt === 'string' && replaceObj ? handleReplace(txt, replaceObj) : txt;
  return txt;
};

export const getList = (contentObj: {}, path: string | string[]): string | any[] => {
  if (!contentObj) {
    return false;
  }

  let items = get(contentObj, path);

  if (typeof items === 'object') items = Object.values(items);

  return items;
};

export const getContentImage = (contentObj: {}, path: string | string[]): string | any[] => {
  if (!contentObj) {
    return false;
  }

  let img = get(contentObj, path);

  img = img ? img.src && img.src.large : img;
  return img;
};

export const getInContent = (path: string): string | any[] => getContent(content, path);

export const getContentList = (
  contentObj: {},
  listPath: string | string[],
  value: string,
  lg?: string,
  replaceObj?: {},
): string | any[] => {
  if (!contentObj) {
    return false;
  }
  const list = get(contentObj, listPath);

  const item = find(list, (it): boolean => it.label === value);

  if (!item) return false;

  let txt = getTranslatedContent(item, lg);
  txt = typeof txt === 'string' && replaceObj ? handleReplace(txt, replaceObj) : txt;
  return txt;
};

const transformValue = (item: {} | string | number | boolean, key?: string): boolean => {
  let itemValue;
  const label = key || 'value';

  if (item && item[label] !== undefined) itemValue = item[label];
  else itemValue = item;

  if (itemValue === undefined || itemValue === null) return undefined;

  // to be sure
  if (testPrimitive(itemValue)) itemValue = itemValue.toString();

  return itemValue;
};

export const compareItems = (
  item1: {} | string | number | boolean,
  item2: {} | string | number | boolean,
  key?: string,
): boolean => {
  const val1 = transformValue(item1, key);
  const val2 = transformValue(item2, key);

  if (val1 === val2 && val1 && val2) {
    return true;
  }

  return false;
};

export const compareSearch = (search1: string | object, search2: string | object): boolean => {
  const elem1 = {
    ...search1,
    page: undefined,
  };
  const elem2 = {
    ...search2,
    page: undefined,
  };

  return JSON.stringify(elem1) === JSON.stringify(elem2);
};

export const compareSearchObj = (
  search1: object,
  search2: object,
  ignore: string[] = [],
): boolean => {
  if (!search1 || !search2) return false;

  let obj1 = search1;
  let obj2 = search2;
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys2.length > keys1.length) {
    obj1 = search2;
    obj2 = search1;
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);
  }

  const keysToIgnore = ignore;

  for (let i = 0; i < keys1.length; i += 1) {
    const key1 = keys1[i];
    const elem1 = obj1[key1];

    let keyMatch = false;

    for (let j = 0; j < keys2.length; j += 1) {
      const key2 = keys2[j];
      const elem2 = obj2[key2];

      if (key1 === key2 && keysToIgnore.indexOf(key1) < 0 && (elem1 || elem2)) {
        keyMatch = true;

        if (!elem1 || !elem2) {
          return false;
        }

        if (typeof elem1 === 'object' || Array.isArray(elem1)) {
          if (!checkEmpty(elem1) || !checkEmpty(elem2)) {
            const isSame = compareSearchObj(elem1, elem2);
            if (!isSame) return false;
          }
        } else if (elem1 !== elem2) {
          return false;
        }
      }
    }
    if (!keyMatch && keysToIgnore.indexOf(key1) < 0 && elem1) {
      if ((typeof elem1 !== 'object' && !Array.isArray(elem1)) || !checkEmpty(elem1)) {
        return false;
      }
    }
  }

  return true;
};

export const isEmpty = (obj: {}): boolean => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const clone = obj => {
  if (!obj) return false;

  return JSON.parse(JSON.stringify(obj));
};

export const getDuration = (duration, options) => {
  const localeOptions = options || {};
  if (!duration) return '';

  const lastFactor = localeOptions.milli ? 1000 : 1;

  const language = localeOptions.lg || config.defaultLanguage;

  let time = duration;
  const days = Math.floor(duration / (24 * 60 * 60 * lastFactor));
  time -= days * (24 * 60 * 60 * lastFactor);
  const hours = Math.floor(time / (60 * 60 * lastFactor));
  time -= hours * (60 * 60 * 1);
  const minutes = Math.floor(time / (60 * lastFactor));

  let str = ''; // `${hours}h${(minutes < 10 && '0') + minutes}m`;
  if (minutes > 0 && !localeOptions.noMin) {
    moment.relativeTimeThreshold('m', 60);
    str = moment
      .duration(minutes, 'minutes')
      .locale(language)
      .humanize();
  }
  if (hours > 0 && !localeOptions.noHours) {
    const hoursText = moment
      .duration(hours, 'hours')
      .locale(language)
      .humanize();

    str = `${hoursText}${str && ' '}${str}`;
  }
  if (days > 0) {
    const daysText = moment
      .duration(days, 'days')
      .locale(language)
      .humanize();

    str = `${daysText} ${str}`;
  }
  return str;
};

export const formMutators = {
  setValue: ([field, value], state, { changeValue }) => {
    changeValue(state, field, () => value);
  },
};

export const combineSchedules = (schedule1, schedule2) => {
  const newData = clone(schedule1);
  if (!schedule2) return newData;
  const externalKeys = Object.keys(schedule2);

  for (let i = 0; i < externalKeys.length; i++) {
    const externalDayKey = externalKeys[i];
    const externalDay = schedule2[externalDayKey];

    const currentDay = newData[externalDayKey];

    if (currentDay && externalDay) {
      newData[externalDayKey] = [...currentDay, ...externalDay];
    } else if (externalDay) {
      newData[externalDayKey] = [...externalDay];
    }
  }

  return newData;
};

export const getTotalSchedule = schedule => {
  let total = 0;
  if (!schedule) return 0;
  const keys = Object.keys(schedule);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const day = schedule[key];

    for (let j = 0; j < day.length; j++) {
      const slot = day[j];

      const from = moment(slot[0], 'HH:mm');
      const to = moment(slot[1], 'HH:mm');

      total += to.diff(from) / (60 * 60 * 1000);
    }
  }

  return total;
};

export const copyClipboard = text => {
  /* Copy the text inside the text field */
  const dummy = document.createElement('input');
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  // Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
};

export const groupByValue = list => {
  const grouped = {};

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    if (!grouped[item]) grouped[item] = 1;
    else grouped[item]++;
  }
  return grouped;
};

export function deepOmit(obj, keysToOmit, deep: boolean = true) {
  const keysToOmitIndex = keyBy(Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit]); // create an index object of the keys that should be omitted

  function omitFromObject(current) {
    // the inner function which will be called recursivley
    return transform(current, (result, value, key) => {
      // transform to a new object
      if (key in keysToOmitIndex) {
        // if the key is in the index skip it
        return;
      }

      result[key] = deep && isObject(value) ? omitFromObject(value) : value; // if the key is an object run it through the inner function - omitFromObject
    });
  }

  return omitFromObject(obj); // return the inner function result
}

export const filterList = (list, filterTxt, filterKeys, discardedKeys) => {
  const filteredList = filter(list, item => {
    const accumulator = {
      match: 0,
    };

    const checkDeep = (obj, acc) => {
      if (!obj) return;
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const value = obj[key];

        if (filterKeys && filterKeys.indexOf(key) < 0) return;

        if (discardedKeys && discardedKeys.indexOf(key) >= 0) return;
        if (
          value &&
          typeof value === 'string' &&
          value.toLowerCase().indexOf(filterTxt.toLowerCase()) >= 0
        ) {
          acc.match = acc.match || 0;
          acc.match++;
        } else if (typeof value === 'object') {
          checkDeep(value, acc);
        }
      }
    };

    checkDeep(item, accumulator);

    return accumulator.match > 0;
  });

  return filteredList;
};

export const mobileAndTabletCheck = () => {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

export const convertObjectToArray = obj => {
  const arr = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const elem = obj[key];
    if (elem) arr.push(key);
  }
  return arr;
};

export const convertArrayToObject = arr => {
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    const id = arr[i];

    if (id) {
      obj[id] = true;
    }
  }
  return obj;
};

export function detectLinkInText(textToCheck) {
  // eslint-disable-next-line
  const expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;

  const regex = new RegExp(expression);
  let match = '';
  const splitText = [];
  let startIndex = 0;

  let continueLoop = (match = regex.exec(textToCheck)) != null;
  while (continueLoop) {
    splitText.push({
      text: textToCheck.substr(startIndex, match.index - startIndex),
      type: 'text',
    });

    const cleanedLink = textToCheck.substr(match.index, match[0].length);
    splitText.push({ text: cleanedLink, type: 'link' });

    startIndex = match.index + match[0].length;

    continueLoop = (match = regex.exec(textToCheck)) != null;
  }

  if (startIndex < textToCheck.length)
    splitText.push({ text: textToCheck.substr(startIndex), type: 'text' });

  return splitText;
}

export const handleVarInString = (
  object: Record<string, any>,
  text: string,
  otherOptions: Record<string, any>,
) => {
  let result = text;

  if (typeof text === 'string' && text.includes('{')) {
    const splittedTitle = words(text, /\{(.*?)\}/g || otherOptions.regex);

    splittedTitle.forEach(element => {
      const variable = element
        .replace('{', '')
        .replace('}', '')
        .split(':');

      // handle list
      let val = get(object, variable[0]) || get(object, variable[1]) || uniqid();

      if (otherOptions && otherOptions.lg && otherOptions.content) {
        const lg = otherOptions.lg;
        const optionContent = otherOptions.content;
        if (variable.length > 1 && content && lg) {
          val =
            getContent(optionContent, `${variable[1]}.${val}`, lg) ||
            getContent(optionContent, `${variable[0]}.${val}`, lg) ||
            getContentList(optionContent, variable[1], val, lg) ||
            getContentList(optionContent, variable[0], val, lg) ||
            val;
        }
      }
      if (val && result) {
        result = result.replace(element, val);
      }
    });
  }

  return result;
};

export const getTextFromObject = (
  item: object | string,
  modelValues: object,
  contentObj: object,
  lg: string,
) => {
  if (!item) {
    return 'NO MATCH';
  }

  // text should not be treated
  if (typeof item === 'string') return item;

  // default behavior
  if (!modelValues) {
    return item[lg] || item.text || item.description || item.label;
  }

  let text;
  if (typeof modelValues.text === 'function') {
    text = modelValues.text(item);
  }
  // case with variables in text
  else if (typeof modelValues.text === 'string' && modelValues.text.includes('{')) {
    text = handleVarInString(item, modelValues.text);
  }
  // case with object text
  else if (typeof modelValues.text === 'object' && modelValues.text.value) {
    text = get(item, modelValues.text.value);
  } else {
    text = get(item, modelValues.text || modelValues.value);
  }

  // Handle multilanguage
  text = (text && text[lg]) || text;

  // Addition of complementary info
  if (modelValues.complementary) {
    let complementary;

    // allows function for special treatment
    if (typeof modelValues.complementary === 'function') {
      complementary = modelValues.complementary(item);
    } else complementary = get(item, modelValues.complementary);

    if (modelValues.complementaryList) {
      complementary = getContent(
        contentObj,
        `${modelValues.complementaryList}.${complementary}`,
        lg,
      );
    }

    // Handle multilanguage
    complementary = (complementary && complementary[lg]) || complementary;

    // Allows a custom format for the complementary information
    if (complementary && !modelValues.complementaryFormat) text += ` - ${complementary}`;
    if (complementary && modelValues.complementaryFormat)
      text = modelValues.complementaryFormat(text, complementary);
  }

  return text;
};

export const getValueFromObject = (
  item: object | string,
  modelValues?: object,
  valueKey?: string,
): string => {
  if (!item) {
    return false;
  }

  // text should not be treated
  if (typeof item === 'string') return item;

  if (!modelValues) {
    return (valueKey && item[valueKey]) || item[config.idKey] || item.value || item.label;
  }

  if (typeof modelValues.value === 'function') {
    return modelValues.value(item);
  }

  return get(item, modelValues.value);
};
