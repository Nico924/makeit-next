import axios from 'axios';
import { config } from 'config/general';
import uniqid from 'uniqid';
import { testPrimitive } from './helper';
/**
 * Types
 */

interface CrudStructure {
  list: (options: {}) => Promise;
  detail: (options: {}) => Promise;
  add: (options: {}) => Promise;
  update: (options: {}) => Promise;
  delete: (options: {}) => Promise;
}

const handleFileType = file => {
  const originalName = file.fileName || file.filename || file.name;

  if (!originalName) {
    if (file.type === 'image/png') return '.png';
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') return '.jpg';
  }

  const ext = originalName.match(/^.*\.(.*)$/)[1];
  return `.${ext}`;
};

const base64MimeType = encoded => {
  let result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
};

export const getFileName = (prefix, file, noUnique) => {
  if (!file) {
    console.error('no file where given');
    return '';
  }

  let type;
  if (typeof file !== 'string') {
    type = file;
  } else type = { type: base64MimeType(file) };

  const name = (prefix || 'file-') + (!noUnique ? `-${uniqid()}` : '') + handleFileType(type);

  return name;
};

/**
 * Axio api call
 */
export function axiosCall(url: string, request: {}): Promise {
  return axios(url, request)
    .then((response): any => response)
    .catch((error): any => error.response);
}

export const getUrl = (path: string, options: {}, base?: string): string => {
  let baseUrl = base || options.baseUrl || config.api.baseUrl;
  if (!base && config.server && config.api.baseUrlServer) baseUrl = config.api.baseUrlServer;

  // paramsToUrl(options.data) : ''
  const url = !options.raw ? baseUrl + path : path;
  return url;
};

const handleUrlVariables = (url, data) => {
  let newUrl = url;

  if (!data) {
    return newUrl;
  }

  const dataKeys = Object.keys(data);
  // replace in url
  if (dataKeys && dataKeys.length > 0) {
    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i];
      const val = data[key];

      // Only primitive values
      if (!testPrimitive(val)) continue;

      newUrl = newUrl.split(`{${key}}`).join(val);
      newUrl = newUrl.split(`:${key}`).join(val);
    }
  }
  return newUrl;
};

const handleUrl = (path, options, baseUrl): string => {
  let url = getUrl(path, options, baseUrl);

  url = handleUrlVariables(url, options);
  url = handleUrlVariables(url, options.data);

  return url;
};

/**
 * Api call logic
 */
export function call(path: string, method: string, options: {} = {}, baseUrl?: string): Promise {
  // Url const urlParams = (type === 'GET' && options.data) ?
  const url = handleUrl(path, options, baseUrl);

  console.log('api call', method, url);

  let headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  let data = options.data;

  if (options.fileUploadS3) {
    headers = {
      'Content-Type': options.headers['Content-Type'],
      'Access-Control-Allow-Origin': '*',
    };

    const file = data.file;

    const xhr = new XMLHttpRequest();
    // no need to reject
    const xhrPromise = new Promise(resolve => {
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Successfully uploaded the file.
            console.log('successfully uploaded presignedurl', file);
            console.log(xhr);
            resolve(xhr);
          } else {
            // The file could not be uploaded.
            console.log('failed to upload presignedurl');
            console.log(xhr);
            resolve(xhr);
          }
        }
      };
      // Here we impose the method
      xhr.open('PUT', url);

      xhr.upload.addEventListener('progress', function(event) {
        if (typeof options.progress === 'function' && event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);

          options.progress({
            progress,
            total: event.total,
            loaded: event.loaded,
          });
        }
      });
      xhr.setRequestHeader('X-Amz-ACL', 'public-read');
      // for text file: text/plain, for binary file: application/octet-stream
      xhr.setRequestHeader('Content-Type', data.type);
      xhr.send(file);
    });
    return xhrPromise.then(resp => resp);
  }

  if (options.fileUpload) {
    headers = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    };

    const formData = new FormData();

    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = data[key];

      if (key === 'file') {
        const name = options.fileName || val.name;
        formData.append('file', val, name);
      } else {
        // eventually other data to attach to the file
        formData.append(key, val);
      }
    }
    data = formData;
  }

  // Request
  const request = {};
  request.method = method;
  request.headers = headers;

  if (options.data && method !== 'GET') {
    request.data = data;
  } else if (options.data && method === 'GET') {
    request.params = data;
  }

  if (options.fileUpload) {
    request.onUploadProgress = function(event): void {
      if (typeof options.progress === 'function') {
        const progress = Math.round((event.loaded / event.total) * 100);

        options.progress({
          progress,
          total: event.total,
          loaded: event.loaded,
        });
      }
    };
  }
  if (config.sessionLogin || options.sessionLogin) {
    request.withCredentials = true;
  }
  return axiosCall(url, request);
}

/**
 * Download logic,baseUrl?: string
 */
export function download(path: string, options: {}, baseUrl?: string): Promise {
  const url = getUrl(path, options, baseUrl);

  const headers = options.headers || {};

  // Request
  const request = {};
  request.method = request.method || 'GET';
  request.headers = headers;
  request.responseType = 'blob';

  return axiosCall(url, request);
}

/**
 * Create Read Update Delete
 */
const crud = (name: string, baseUrl?: string): CrudStructure => ({
  list: (options: {}): Promise => call(`${name}`, 'GET', options, baseUrl),
  detail: (options: {}): Promise =>
    call(`${name}/${options.id || '{id}'}`, 'GET', options, baseUrl),
  search: (options: {}): Promise =>
    call(`${name}${config.searchUrlSuffix}`, 'GET', options, baseUrl),
  add: (options: {}): Promise => call(`${name}`, 'POST', options, baseUrl),
  update: (options: {}): Promise =>
    call(`${name}/${options.id || '{id}'}`, config.putUpdate ? 'PUT' : 'PATCH', options, baseUrl),
  delete: (options: {}): Promise =>
    call(`${name}/${options.id || '{id}'}`, 'DELETE', options, baseUrl),
});

export { crud };
