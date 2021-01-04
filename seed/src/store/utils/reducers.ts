import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import get from 'lodash/get';
import set from 'lodash/set';

import { config } from 'config/general';
import { compareItems, compareSearch } from './helper';

// resturn true if same

export const treatList = (list: object[], transformFunc: Function): object[] => {
  if (!list) return null;

  const newData = [];

  for (let i = 0; i < list.length; i++) {
    newData.push(transformFunc(list[i]));
  }
  return newData;
};

export const treatmentData = (data: object[] | object, transformFunc?: Function): object[] => {
  if (!transformFunc || typeof transformFunc !== 'function') return data;

  if (Array.isArray(data)) {
    return treatList(data, transformFunc);
  }
  return transformFunc(data);
};

export const getStateData = (state: {}, path: string): {} => {
  const current = get(state, path);
  if (!current) return false;
  const list = current.data;
  if (!list) return false;
  // list = list.slice();
  return list;
};

const handleDefaultEndRequest = (state: {}, path: string): {} => {
  set(state, path, {
    ...get(state, path),
    loaded: true,
    loading: false,
  });
  return state;
};

/**
 * For any request
 */
export function handleRequest(state: {}, action: {}, path: string, reset?: boolean): {} {
  const payload = action.payload;
  const limit = (payload && payload.limit) || config.defaultLimit;
  let noReset = payload && payload.noReset;
  if (!noReset) {
    noReset = !reset;
  }
  if (payload && payload.reset) {
    noReset = false;
  }
  let newElem;
  if (!noReset) {
    newElem = {
      limit,
      loaded: false,
      loading: true,
    };
  } else {
    newElem = {
      ...get(state, path),
      limit,
      loaded: false,
      loading: true,
    };
  }
  set(state, path, newElem);

  return state;
}

export const handlePageRequest = (state: {}, action: {}, path: string): {} => {
  const payload = action.payload;

  const current = get(state, path);

  const currentSearch = current && current.search;
  const reset = !compareSearch(currentSearch, payload);

  const tmpState = handleRequest(state, action, path, reset);

  set(tmpState, path, {
    ...get(tmpState, path),
    search: payload,
    currentPage: (payload && payload.page) || 1,
  });

  return tmpState;
};
/**
 * Setter
 */
export function handleResponse(state: {}, action: {}, path: string, transformFunc?: Function): {} {
  const { payload, status, requestData } = action;

  if (payload && status === 'fulfilled') {
    const current = get(state, path);

    set(state, path, {
      ...current,
      requestData,
      data: treatmentData(payload, transformFunc),
      loaded: true,
      loading: false,
      noMore: (current && current.limit && payload.length < current.limit) || payload.length === 0,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function handleCountResponse(
  state: {},
  action: {},
  path: string,
  transformFunc?: Function,
  dataLabel?: string,
  countLabel?: string,
): {} {
  const { payload, status, requestData } = action;

  const nameCount = countLabel || `${path}sGetCount`;
  const nameData = dataLabel || `${path}sGetMany`;

  if (payload && status === 'fulfilled') {
    const current = get(state, path);
    set(state, path, {
      ...current,
      requestData,
      data: treatmentData(payload[nameData], transformFunc),
      count: payload[nameCount],
      loaded: true,
      loading: false,
      noMore: (current && current.limit && payload.length < current.limit) || payload.length === 0,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function handleReset(state: {}, action: {}, path: string): {} {
  set(state, path, null);
  return state;
}

export function handlePageResponse(
  state: {},
  action: {},
  path: string,
  transformFunc?: Function,
): {} {
  const { payload, status, requestData } = action;

  if (!payload) return handleDefaultEndRequest(state, path);

  const data = payload.data;
  const metadata = payload.metadata;

  const pagination = metadata && metadata.pagination;

  if (data && status === 'fulfilled') {
    const current = get(state, path);
    set(state, path, {
      ...current,
      requestData,
      metadata,
      pages: {
        ...current.pages,
        [(pagination && pagination.current_page) || 1]: treatmentData(data, transformFunc),
      },
      loaded: true,
      loading: false,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}
/**
 * Any add response (list or unit)
 */
export function handleAddResponse(
  state: {},
  action: {},
  path: string,
  transformFunc?: Function,
  reverse?: boolean,
): {} {
  const { payload, status } = action;

  const list = getStateData(state, path);
  if (!list) return handleResponse(state, action, path, transformFunc);

  const current = get(state, path);

  let treatedData = treatmentData(payload, transformFunc);
  if (!Array.isArray(treatedData)) treatedData = [treatedData];

  const newData = reverse ? [...treatedData.concat(list)] : [...list.concat(treatedData)];

  if (payload && status === 'fulfilled') {
    set(state, path, {
      ...current,
      data: newData,
      loaded: true,
      noMore: (current.limit && payload.length < current.limit) || payload.length === 0,
      loading: false,
    });
    return state;
  }

  // PAGES MODE
  return handleDefaultEndRequest(state, path);
}

export function handleUpdateResponse(
  state: {},
  action: {},
  path: string,
  transformFunc?: Function,
  idKey?: string = config.idKey,
): {} {
  const { payload, status } = action;

  if (payload && status === 'fulfilled') {
    const list = getStateData(state, path);
    if (!list) return handleDefaultEndRequest(state, path);

    const index = findIndex(list, (item): boolean => compareItems(item, payload, idKey));
    list.splice(index, 1, treatmentData(payload, transformFunc));

    set(state, path, {
      ...get(state, path),
      data: list,
      loaded: true,
      loading: false,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function handleUpdatePaginationResponse(
  state: {},
  action: {},
  path: string,
  transformFunc?: Function,
  idKey?: string = config.idKey,
): {} {
  const { payload, status } = action;

  if (payload && status === 'fulfilled') {
    const current = get(state, path);
    const pages = current.pages;
    if (!pages) return handleDefaultEndRequest(state, path);

    const keys = Object.keys(pages);

    keys.forEach((key): void => {
      const page = pages[key];
      const index = findIndex(page, (item): boolean => compareItems(item, payload, idKey));
      page.splice(index, 1, treatmentData(payload, transformFunc));
    });

    set(state, path, {
      ...current,
      pages: { ...pages },
      loaded: true,
      loading: false,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function handleDeleteResponse(
  state: {},
  action: {},
  path: string,
  idKey?: string = config.idKey,
): {} {
  const { payload, status, requestData } = action;

  const deletedId = (requestData && requestData.id) || payload[idKey] || payload;
  if (payload && status === 'fulfilled') {
    const list = getStateData(state, path);
    if (!list) return handleDefaultEndRequest(state, path);
    remove(list, (item): boolean => item[idKey] === deletedId);

    set(state, path, {
      ...get(state, path),
      data: list,
      loaded: true,
      loading: false,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function handleDeletePaginationResponse(
  state: {},
  action: {},
  path: string,
  idKey?: string = config.idKey,
): {} {
  const { payload, status } = action;

  if (payload && status === 'fulfilled') {
    const current = get(state, path);

    const pages = current.pages;
    if (!pages) return handleDefaultEndRequest(state, path);

    const keys = Object.keys(pages);

    keys.forEach((key): void => {
      const page = pages[key];
      remove(page, (item): boolean => item[idKey] === payload);
    });

    set(state, path, {
      ...current,
      pages: { ...pages },
      loaded: true,
      loading: false,
    });
    return state;
  }
  return handleDefaultEndRequest(state, path);
}

export function defaultTreatItem(
  item: {},
  excludedKeys?: string[],
  idKey?: string = config.idKey,
): {} {
  const newItem = {
    [idKey]: item[idKey],
    type: item.type,
  };

  const keys = Object.keys(item);
  keys.forEach((key): void => {
    if (excludedKeys && excludedKeys.indexOf(key) >= 0) return;

    const attr = item[key];

    // undefined, null, '', false
    if (!attr) {
      newItem[key] = attr;
      return;
    }
    if (typeof attr === 'object') {
      // TODO
    }
    if (Array.isArray(attr)) {
      // TODO
    }
    newItem[key] = attr;
  });

  return newItem;
}
