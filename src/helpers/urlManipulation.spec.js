import {
  getQueryParameter,
  getQueryParameters,
  setQueryParameter,
  setQueryParameters
} from './urlManipulation';

describe('urlManipulation utility', () => {

  describe('getQueryParameter', () => {

    describe('it returns correct values for:', () => {
      [
        [
          '?foo=bar',
          'foo',
          'defaultValue',
          'bar'
        ],
        [
          '?parameter=value',
          'foo',
          'defaultValue',
          'defaultValue'
        ],
        [
          '?parameter=value&foo=parameter+value',
          'foo',
          'defaultValue',
          'parameter value'
        ],
        [
          '?booleanParameter',
          'booleanParameter',
          false,
          '--present--'
        ],
        [
          '?foo=bar&booleanParameter',
          'booleanParameter',
          false,
          '--present--'
        ],
        [
          '?foo=bar',
          'booleanParameter',
          false,
          false
        ],
        [
          '?foo=bar&booleanParameter',
          'foo',
          false,
          'bar'
        ]
      ].forEach(([search, parameterName, defaultValue, expectedValue]) => {
        // eslint-disable-next-line max-len
        it(`Parameter "${parameterName}" from ${search} => ${expectedValue} (defaults to ${defaultValue})`, () => {
          expect(getQueryParameter(
            { search },
            parameterName,
            defaultValue
          )).toEqual(expectedValue);
        });
      });
    });

  });

  describe('getQueryParameters', () => {

    describe('it returns correct values for:', () => {
      [
        [
          '?foo=bar',
          {
            foo: 'defaultValue',
            bar: 'someValue'
          },
          {
            foo: 'bar',
            bar: 'someValue'
          }
        ],
        [
          '?parameter=value',
          {
            foo: 'defaultValue'
          },
          {
            foo: 'defaultValue'
          }
        ],
        [
          '?parameter=value&foo=parameter+value',
          {
            foo: 'defaultValue'
          },
          {
            foo: 'parameter value'
          }
        ],
        [
          '?booleanParameter&foo=value',
          {
            foo: 'defaultValue',
            bar: 'defaultValue',
            booleanParameter: false
          },
          {
            foo: 'value',
            bar: 'defaultValue',
            booleanParameter: '--present--'
          }
        ],
        [
          '?foo=bar&booleanParameter',
          {
            booleanParameter: false
          },
          {
            booleanParameter: '--present--'
          }
        ],
        [
          '?foo=bar',
          {
            booleanParameter: false
          },
          {
            booleanParameter: false
          }
        ],
        [
          '?foo=bar&booleanParameter',
          {
            foo: false
          },
          {
            foo: 'bar'
          }
        ]
      ].forEach(([search, setup, expectedValue]) => {
        // eslint-disable-next-line max-len
        it(`Parameters "${JSON.stringify(setup)}" from ${search} => ${JSON.stringify(expectedValue)}`, () => {
          expect(getQueryParameters(
            { search },
            setup
          )).toMatchObject(expectedValue);
        });
      });
    });

  });

  describe('setQueryParameter', () => {

    describe('it returns modified url string:', () => {
      [
        [
          {
            href: 'index.html?foo=bar#/',
            search: '?foo=bar',
            hash: '#/'
          },
          'foo',
          'new value',
          'index.html?foo=new+value#/'
        ],
        [
          {
            href: 'index.html?foo=bar#/',
            search: '?foo=bar',
            hash: '#/'
          },
          'foo',
          false,
          'index.html#/'
        ],
        [
          {
            href: 'index.html?parameter=value&secondParameter=second+value',
            search: '?parameter=value&secondParameter=second+value',
            hash: ''
          },
          'foo',
          'new value',
          'index.html?parameter=value&secondParameter=second+value&foo=new+value'
        ],
        [
          {
            href: 'index.html?parameter=value&secondParameter=second+value',
            search: '?parameter=value&secondParameter=second+value',
            hash: ''
          },
          'parameter',
          false,
          'index.html?secondParameter=second+value'
        ],
        [
          {
            href: 'index.html#/manage-your-details/personal-details',
            search: '',
            hash: '#/manage-your-details/personal-details'
          },
          'foo',
          'new value',
          'index.html?foo=new+value#/manage-your-details/personal-details'
        ]
      ].forEach(([location, parameterName, newValue, expectedResultUrl]) => {
        // eslint-disable-next-line max-len
        it(`${location.href} + {${parameterName}: ${newValue}} => ${expectedResultUrl}`, () => {
          expect(setQueryParameter(
            location,
            parameterName,
            newValue
          )).toEqual(expectedResultUrl);
        });
      });
    });

  });

  describe('setQueryParameters', () => {

    describe('it returns modified url string:', () => {
      [
        [
          {
            href: 'index.html?foo=bar&removeMeParameter=someValue#/',
            search: '?foo=bar&removeMeParameter=someValue',
            hash: '#/'
          },
          {
            foo: 'fooValue',
            bar: 'barValue',
            booleanParameter: '--present--',
            removeMeParameter: false
          },
          'index.html?foo=fooValue&bar=barValue&booleanParameter#/'
        ],
        [
          {
            href: 'index.html#/manage-your-details/personal-details',
            search: '',
            hash: '#/manage-your-details/personal-details'
          },
          {
            foo: 'fooValue'
          },
          'index.html?foo=fooValue#/manage-your-details/personal-details'
        ]
      ].forEach(([location, setup, expectedResultUrl]) => {
        // eslint-disable-next-line max-len
        it(`${location.href} + ${JSON.stringify(setup)} => ${expectedResultUrl}`, () => {
          expect(setQueryParameters(
            location,
            setup,
          )).toEqual(expectedResultUrl);
        });
      });
    });

  });

});
