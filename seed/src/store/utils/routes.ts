import { Routes } from 'config/route';
import { config } from 'config/general';

import get from 'lodash/get';
import findKey from 'lodash/findKey';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

import qs from 'query-string';

export const getObjectFromLanguage = (obj, value) => {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = obj[key];
    let found = false;
    config.availableLanguages.forEach(lg => {
      if (val[lg] === value) {
        found = true;
      }
    });

    if (found) {
      return val;
    }
  }
  return false;
};

const getFusionnedRoute = (all: {}, path?: string | string[], lg: string): string => {
  const result = [];

  if (path && !Array.isArray(path)) path = path.split('.');

  if (!Array.isArray(path)) return path;

  let currentStructure = all;
  for (let index = 0; index < path.length; index++) {
    const pathElement = path[index];

    currentStructure = get(currentStructure, pathElement);

    if (!currentStructure) return '';

    if (currentStructure[lg]) {
      result.push(currentStructure[lg]);
    }
    if (currentStructure.params) {
      let param = currentStructure.params;
      // remove parameters regex
      param = param.replace(/\((.*)\)/, '');
      result.push(param);
    }
  }

  return result.join('/');
};

// Create the corresponding route ID from a destrucured paths and the config object (all)
const getRouteInfo = (all: {}, splittedUrl: string[], lg: string): {} => {
  let current = all;

  const paths = [];
  const url = [];
  const params = {};

  // Find key for translated value { fr : inscription } => signup
  for (let index = 0; index < splittedUrl.length; index++) {
    const urlPath = splittedUrl[index];

    const key = findKey(current, { [lg]: urlPath });

    if (key) {
      current = current[key];
      // result.push(key);

      url.push(key);
      paths.push(key);
    }
    // If no occurence found for value, search if params
    if (!key) {
      // search for an object with a params value in it => example type: { params: ':type' } => return {params: ':type'}
      const structureWithParams = find(current, 'params');
      if (structureWithParams) {
        // in the example above id will be "type"
        const id = findKey(current, structureWithParams);

        paths.push(id);

        url.push(structureWithParams.params);
        params[id] = urlPath;

        current = structureWithParams;
      }
    }
  }

  return { path: paths.join('.'), url: `/${url.join('/')}`, params, lg };
};

// eg: <Route path={getUrlFromPath('search', match)} />
export const getUrlFromPath = (path: string, match: {}): string => {
  const lg = (match && match.params && match.params.lg) || config.defaultLanguage;

  if (!match) {
    console.log('error: no match provided to getUrlFromPath');
    return '';
  }

  if (path && lg && path.includes('.')) {
    path = getFusionnedRoute(Routes, path, lg) || path;
  }

  if (typeof path !== 'string') return path;

  const result = get(Routes, path);
  if (result) {
    path = result[lg];
  }

  if (result && result.params && !path) {
    path = result.params;
  }

  if ((match && match.path === '/') || (match && match.params && !match.params.lg)) {
    return `/${path}`;
  }

  // include lg
  if (match && match.params && match.params.lg) {
    // path includes the language part (eg: /:lg/rest... )
    const splittedPath = match.path.split('/');
    return `/${splittedPath[1]}/${path}`;
  }

  return path;
};

// eg: <NavLink to={pushRoute('home', match)}>
// match can be just a string with wanted lg
// options is for all params eg: pushRoute('home', match, {id: ...})
export const pushRoute = (
  path: string | string[],
  match?: {} | string,
  options?: {},
  search?: {} | string | null,
): string => {
  let lg;

  // Case pushRoute(path, 'fr') match is not object but we get language
  if (typeof match === 'string') {
    lg = match;
  } else {
    // Case we give match
    lg = (match && match.params && match.params.lg) || config.defaultLanguage;
  }

  if (path && lg && path.includes('.')) {
    path = getFusionnedRoute(Routes, path, lg) || path;
  }

  const result = get(Routes, path);

  // if given path is simply first floor Route
  if (result) {
    path = result[lg];
  }

  // if options is in path ( ex: /..rest/:id )
  // if path includes params but options is not pass. check if params is in match
  if ((path && options) || (path && path.includes('/:'))) {
    if (options) {
      if (typeof options === 'string') {
        console.log('TBD');
      } else {
        const key = Object.keys(options);
        for (let index = 0; index < key.length; index++) {
          const element = key[index];
          if (typeof path === 'string') path = path.replace(`:${element}`, options[element]);
        }
      }
    } else {
      if (typeof path === 'string') path = path.split('/');
      for (let index = 0; index < path.length; index++) {
        let partOfPath = path[index];
        partOfPath = partOfPath.replace(':', '');
        if (match && typeof match !== 'string' && match.params[partOfPath]) {
          path[index] = match.params[partOfPath];
        }
      }
    }
  }

  if (Array.isArray(path)) {
    path = path.join('/');
  }

  if (search && typeof search === 'string') {
    path += search;
  }

  // Case language in the url and match is not a string
  // If type of match = string ( eg: 'fr' ) params is missing
  if (lg !== config.defaultLanguage) {
    return `/${lg}/${path}`;
  }
  return `/${path}`;
};

/**
 * From location to route info
 * @location Object : classic location object with pathname
 * @location string : url
 */
export const getRouteInfoFromLocation = (location: {} | string): string | object => {
  let splittedLocation = [];
  let lg;

  if (typeof location === 'string') splittedLocation = location.split('/');

  // split location for get an Array (if location object)
  if (location && location.pathname && typeof location.pathname === 'string')
    splittedLocation = location.pathname.split('/');

  // becasuse first element of splittedLocation is all time [''] => remove (because url start with /)
  if (splittedLocation) splittedLocation.shift();

  // Check if search in location
  const searchIndex = findIndex(splittedLocation, el => el.includes('?'));

  let searchParams;
  if (searchIndex !== -1) {
    let splittedSearch = splittedLocation[searchIndex];
    splittedSearch = splittedSearch.split('?');
    splittedLocation[searchIndex] = splittedSearch[0];

    searchParams = qs.parse(splittedSearch[1]);
  }

  // check if in splittedLocation one of available languages is, if true remove them
  for (let index = 0; index < config.availableLanguages.length; index++) {
    const lang = config.availableLanguages[index];

    for (let j = 0; j < splittedLocation.length; j++) {
      const path = splittedLocation[j];
      if (path === lang) {
        // we found the language
        lg = path;
        splittedLocation.shift();
        break;
      }
    }
  }
  const routeInfo = getRouteInfo(Routes, splittedLocation, lg || config.defaultLanguage);

  return { ...routeInfo, searchParams };
};
