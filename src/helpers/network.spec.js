/* eslint-disable no-shadow */
import { get, post, urlWithParams } from './network';

describe('urlWithParams', () => {

  it('should return url if parameters are not passed', () => {
    expect(urlWithParams('url')).toBe('url');
  });

  it('should construct url with appended params', () => {
    expect(
      urlWithParams(
        'url',
        {
          param1: 1,
          param2: 2,
          search: 'panasonic smart TV'
        }
      )
    ).toBe('url?param1=1&param2=2&search=panasonic%20smart%20TV');
  });

  it('should construct url with appended params when url already contains some parameter', () => {
    expect(
      urlWithParams(
        'url?foo=bar',
        {
          param1: 1,
          param2: 2,
          search: 'panasonic smart TV'
        }
      )
    ).toBe('url?foo=bar&param1=1&param2=2&search=panasonic%20smart%20TV');
  });

});

describe('get', () => {

  describe('successful request', () => {

    let fetchSpy;

    beforeEach(() => {
      HTMLFormElement.prototype.submit = jest.fn();

      fetchSpy = jest.fn().mockImplementation(
        () => Promise.resolve({
          status: 200,
          statusText: 'OK',
          text: () => new Promise(resolve => resolve('OK'))
        })
      );

      global.fetch = fetchSpy;
    });

    it('calling get should call fetch with correct parameters', () => {
      get('ajax.html');

      expect(fetchSpy).toHaveBeenCalledWith(
        'ajax.html',
        {
          mode: 'cors',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
    });

  });

  describe('failed request', () => {

    let fetchSpy;

    beforeEach(() => {
      fetchSpy = jest.fn().mockImplementation(
        () => Promise.resolve({
          status: 500,
          statusText: 'ERROR',
          text: () => Promise.resolve('ERROR')
        })
      );

      global.fetch = fetchSpy;
    });

    it('calling get should call fetch with correct parameters', (done) => {
      get('ajax.html')
        .catch((error) => {
          expect(error.message).toBe('ERROR');
        })
        .then(done);

      expect(fetchSpy).toHaveBeenCalledWith(
        'ajax.html',
        {
          mode: 'cors',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
    });

  });

  describe('unauthorized request', () => {

    let fetchSpy;

    beforeEach(() => {
      fetchSpy = jest.fn().mockImplementation(() => new Promise((resolve) => {
        resolve({
          status: 200,
          statusText: 'ERROR',
          text: () => new Promise((resolve) => {
            resolve(JSON.stringify({
              status: 'UNAUTHORIZED'
            }));
          })
        });
      }));

      global.fetch = fetchSpy;
    });

    it('calling get should call fetch with correct parameters', () => {
      get('ajax.html');

      expect(fetchSpy).toHaveBeenCalledWith(
        'ajax.html',
        {
          mode: 'cors',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
    });

  });

});

describe('post', () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({
        status: 200,
        statusText: 'OK',
        text: () => new Promise(resolve => resolve())
      });
    }));

    global.fetch = fetchSpy;
  });

  it('calling post should call fetch with correct parameters using JSON', () => {
    post('ajax.html', { foo: 'bar' });

    expect(fetchSpy).toHaveBeenCalledWith(
      'ajax.html',
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ foo: 'bar' })
      }
    );
  });

  it('calling post should call fetch with correct parameters NOT using JSON', () => {
    post('ajax.html', { foo: 'bar' }, false);

    expect(fetchSpy).toHaveBeenCalledWith(
      'ajax.html',
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: { foo: 'bar' }
      }
    );
  });

});
