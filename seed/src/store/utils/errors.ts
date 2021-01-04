import { config } from 'config/general';
import { getContent } from './helper';

/**
 * Get validation info from error code
 */
export const getValidationInfo = (
  validationError: string,
  byDefault?: string,
  replace: {},
): string | {} => {
  let error;
  const validatonPath = config.validationPath || config.pathToValidationInCMS;

  if (byDefault && !validatonPath) {
    error = byDefault;
  } else {
    error = `${validatonPath}.${validationError}`;
  }

  if (replace) {
    return {
      replace,
      error,
    };
  }

  return error;
};

/**
 * Get error code from error object data
 * @param {object} data - error object
 */
export const extractErrorCode = (data): string => {
  if (data) {
    // extract message or code
    const error =
      data[config.errorFirebaseCodeLabel] ||
      data[config.errorCodeLabel] ||
      // fallback for code
      data.code ||
      data;

    return error;
  }
  return '';
};

/**
 * Get error message from error object data
 * @param {object} data - error object
 */
const extractErrorMessage = (data): string => {
  if (data) {
    // extract message or code
    const error =
      data[config.errorMessageLabel] ||
      // fallback for message
      data.message ||
      data.error_message ||
      data;

    return error;
  }
  return '';
};

/**
 * @param {object} data - Api data
 */
export const extractErrorData = (data): object[] | {} => {
  if (data) {
    // extract list
    let errorData =
      data[config.errorListLabel] || data[config.defaultErrorsPath] || data.errors || data;

    // if array of errors, return the list
    if (Array.isArray(errorData)) {
      return errorData;
    }
    // extract firebase error
    errorData = errorData[config.firebaseErrorLabel] || errorData;
    return errorData;
  }
  return null;
};

/**
 * Get error message from errorData, app content, language and a fallback
 * @param {object} errorData - Error data
 */
export const getErrorMessage = (errorData, contentObj, lg, defaultError) => {
  const code = extractErrorCode(errorData);

  let string;

  if (code) {
    // try to get error in the content
    string = getContent(contentObj, `${config.errorsPath}.${code}`, lg);
  }
  if (!string) {
    string = extractErrorMessage(errorData);
  }
  if (!string) return defaultError;

  return string;
};

export const handleApolloError = error => {
  const { networkError, graphQLErrors } = error;

  const constructedErrors = [];

  console.log('graphQLErrors', graphQLErrors);

  if (networkError && networkError.result) {
    const {
      statusCode,
      result: { errors },
    } = networkError;

    console.log('network', errors, statusCode);

    if (Array.isArray(errors)) {
      errors.forEach(r => {
        constructedErrors.push({
          code: r.code,
          message: r.message,
        });
      });
    }
  }

  if (graphQLErrors) {
    if (Array.isArray(graphQLErrors)) {
      graphQLErrors.forEach(r => {
        constructedErrors.push({
          code: r.code,
          message: r.message,
        });
      });
    }
  }

  console.log('constructedErrors', constructedErrors);

  return { errors: constructedErrors };
};
