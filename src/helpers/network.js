/* global document */
import { paths, constants } from '../config';

const defaultValidStatuses = Array.from(Array(100).keys()).map(i => i + 200); // [200, 201, ..., 299]

function checkStatus(response, validStatuses = defaultValidStatuses) {
  if ((validStatuses.indexOf(response.status) > -1)) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function createFakeForm(url, data = {}) {
  if (typeof window === 'undefined') return null;

  const form = document.createElement('form');

  form.setAttribute('method', 'POST');
  form.setAttribute('action', url);
  form.setAttribute('class', 'hidden');

  Object.keys(data).forEach((key) => {
    const fakeInput = document.createElement('input');

    fakeInput.setAttribute('name', key);
    fakeInput.setAttribute('value', data[key]);
    form.appendChild(fakeInput);
  });

  return form;
}

function getJson(response) {
  if (typeof response === 'undefined' || typeof window === 'undefined') return {};

  return response.text().then((text) => {
    if (text === '' || text === 'OK' || typeof text === 'undefined') {
      return {};
    }

    const json = JSON.parse(text);

    if (json.status === constants.UNAUTHORIZED_STATUS) {
      const fakeForm = createFakeForm(paths.UNAUTHORIZED_REDIRECT_PATH, { inactivityLogOut: 1 });
      document.querySelector('body').appendChild(fakeForm);
      fakeForm.submit();
    }

    return json;
  });
}

export function urlWithParams(url, params) {
  let paramsString = '';

  if (params !== undefined) {
    const prefix = url.indexOf('?') > 0 ? '&' : '?';

    paramsString = prefix + Object
      .keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  return url + paramsString;
}

const defaultGetOptions = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
};

export function get(url, validStatuses, options = defaultGetOptions) {
  return fetch(url, options)
    .then(response => checkStatus(response, validStatuses))
    .then(getJson);
}

export function post(url, data, useJSON = true) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': useJSON ? 'application/json' : 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: useJSON ? JSON.stringify(data) : data
  })
    .then(checkStatus)
    .then(getJson);
}

export function postJSON(bitmask, data, path = paths.JSON_API_PATH) {
  const endpoint = urlWithParams(path, { save: bitmask });
  const postData = {
    [bitmask]: { formId: bitmask, formData: data }
  };

  return post(endpoint, postData);
}
