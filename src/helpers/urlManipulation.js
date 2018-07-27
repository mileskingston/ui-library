function extractQueryParameters(location) {
  if (!/^[?]/.test(location.search)) {
    return [];
  }

  return location.search.slice(1)
    .split('&')
    .reduce((params, param) => {
      let key;
      let value;
      if (param.indexOf('=') < 0) {
        [key, value] = [param, '--present--'];
      } else {
        [key, value] = param.split('=');
      }

      params[key] = value
        ? decodeURIComponent(value.replace(/\+/g, ' '))
        : '';

      return params;
    }, {});
}

/**
 * Extracts query parameter from location.search
 *
 * @param {object} location
 * @param {string} parameterName
 * @param {string} defaultValue
 * @return {string}
 */
export function getQueryParameter(location, parameterName, defaultValue) {
  return extractQueryParameters(location)[parameterName] || defaultValue;
}

/**
 * Extracts query parameters from location.search
 *
 * @param {object} location
 * @param {object} setup
 * @return {object}
 */
export function getQueryParameters(location, setup) {
  const result = {};

  Object
    .entries(extractQueryParameters(location))
    .forEach(([key, value]) => {
      result[key] = value || setup[key];
    });

  Object
    .entries(setup)
    .filter(([key]) => result[key] === undefined)
    .forEach(([key, value]) => {
      result[key] = value;
    });

  return result;
}

/**
 *
 * @param {object} location
 * @param {string} parameterName
 * @param {string|bool} value - pass `false` to remove the parameter
 * @return {string}
 */
export function setQueryParameter(location, parameterName, value) {
  const originalHash = location.hash;

  const strippedUrl = location.href
    .replace(location.hash, '')
    .replace(location.search, '');

  const originalParameters = extractQueryParameters(location);

  let valueReplaced = false;

  const parameters = Object.keys(originalParameters).map((key) => {
    let newValue = originalParameters[key];

    if (key === parameterName) {
      valueReplaced = true;
      newValue = value;
    }

    if (newValue === false) {
      return false;
    }

    return `${key}=${encodeURIComponent(newValue).replace(/%20/g, '+')}`;
  }).filter(v => v !== false);

  if (!valueReplaced && value !== false) {
    parameters.push(`${parameterName}=${encodeURIComponent(value).replace(/%20/g, '+')}`);
  }

  return `${strippedUrl}${parameters.length ? '?' : ''}${parameters.join('&')}${originalHash}`;
}

/**
 *
 * @param {object} location
 * @param {object} setup
 * @return {string}
 */
export function setQueryParameters(location, setup) {
  const originalHash = location.hash;

  const strippedUrl = location.href
    .replace(location.hash, '')
    .replace(location.search, '');

  const originalParameters = extractQueryParameters(location);

  const valuesReplaced = {};

  const parameters = Object.keys(originalParameters).map((key) => {
    let newValue = originalParameters[key];

    if (setup[key] !== undefined) {
      valuesReplaced[key] = true;
      newValue = setup[key];
    }

    if (newValue === false) {
      return false;
    }

    return `${key}=${encodeURIComponent(newValue).replace(/%20/g, '+')}`;
  }).filter(v => v !== false);

  Object
    .entries(setup)
    .forEach(([setupKey, setupValue]) => {
      if (!valuesReplaced[setupKey] && setupValue !== false) {
        if (setupValue === '--present--') {
          parameters.push(`${setupKey}`);
        } else {
          parameters.push(`${setupKey}=${encodeURIComponent(setupValue).replace(/%20/g, '+')}`);
        }
      }
    });

  return `${strippedUrl}${parameters.length ? '?' : ''}${parameters.join('&')}${originalHash}`;
}

export default {
  getQueryParameter,
  getQueryParameters,
  setQueryParameter,
  setQueryParameters
};
