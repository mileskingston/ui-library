import {
  autocompleteLocations,
  getPlaceDetails,
  getPlaceDetailsByAddress,
  verifyGoogleMapsApiSetup,
  extractAddressComponent
} from './location';

describe('Location helper', () => {

  describe('verifyGoogleMapsApiSetup', () => {
    it('gracefully handles missing Google Maps API', () => {
      const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {
      });

      expect(verifyGoogleMapsApiSetup()).toBe(false);
      expect(spy.mock.calls[0][0]).toMatch('Google Maps APIs not available.');

      verifyGoogleMapsApiSetup.warned = false;
      spy.mockReset();
    });

    it('gracefully handles missing Google Maps API, warns only once', () => {
      const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {
      });

      expect(verifyGoogleMapsApiSetup()).toBe(false);
      expect(verifyGoogleMapsApiSetup()).toBe(false);
      expect(spy.mock.calls.length).toEqual(1);
      expect(spy.mock.calls[0][0]).toMatch('Google Maps APIs not available.');

      verifyGoogleMapsApiSetup.warned = false;
      spy.mockReset();
    });

    it('gracefully handles missing Google Maps places API', () => {
      window.google = {
        maps: {}
      };

      const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {
      });

      expect(verifyGoogleMapsApiSetup()).toBe(false);
      expect(spy.mock.calls[0][0]).toMatch('Google Maps Places APIs not available.');

      verifyGoogleMapsApiSetup.warned = false;
      spy.mockReset();
    });
  });

  describe('autocompleteLocations', () => {
    it('returns suggestions', (done) => {
      const FAKE_SUGGESTIONS = [
        {
          description: 'Brno, Czech Republic'
        },
        {
          description: 'Dene Road, Androver SP10 2AA, United Kingdom'
        }
      ];
      const LatLngSpy = jest.fn();

      function FakeAutocompleteService() {
        return {
          getPlacePredictions(config, callback) {
            expect(config.input).toBe('SP10 2AA');
            callback(FAKE_SUGGESTIONS, 'OK');
          }
        };
      }

      window.google = {
        maps: {
          places: {
            AutocompleteService: FakeAutocompleteService,
            PlacesServiceStatus: {
              OK: 'OK',
              ERROR: 'ERROR'
            }
          },
          LatLng: LatLngSpy
        }
      };

      autocompleteLocations('SP10 2AA')
        .then((suggestions) => {
          expect(suggestions).toEqual(FAKE_SUGGESTIONS);
          delete window.google;
          done();
        });
    });

    it('handles errors', (done) => {
      const FAKE_SUGGESTIONS = [];
      const LatLngSpy = jest.fn();

      function FakeAutocompleteService() {
        return {
          getPlacePredictions(config, callback) {
            expect(config.input).toBe('SP10 2AA');
            callback(FAKE_SUGGESTIONS, 'ERROR');
          }
        };
      }

      window.google = {
        maps: {
          places: {
            AutocompleteService: FakeAutocompleteService,
            PlacesServiceStatus: {
              OK: 'OK',
              ERROR: 'ERROR'
            }
          },
          LatLng: LatLngSpy
        }
      };

      autocompleteLocations('SP10 2AA')
        .then(
          () => {
            expect(false).toBe(true, 'Resolve callback should not be called');
            done();
          },
          (status) => {
            expect(status).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('getPlaceDetails', () => {
    it('return place details', (done) => {
      const FAKE_DETAILS = [
        {
          description: 'Brno, Czech Republic'
        },
        {
          description: 'Dene Road, Androver SP10 2AA, United Kingdom'
        }
      ];

      function FakePlacesService() {
        return {
          getDetails(config, callback) {
            expect(config.placeId).toBe('place_id');
            callback(FAKE_DETAILS, 'OK');
          }
        };
      }

      window.google = {
        maps: {
          places: {
            PlacesService: FakePlacesService,
            PlacesServiceStatus: {
              OK: 'OK',
              ERROR: 'ERROR'
            }
          },
          Map: jest.fn()
        }
      };

      getPlaceDetails('place_id')
        .then((details) => {
          expect(details).toEqual(FAKE_DETAILS);
          delete window.google;
          done();
        });
    });

    it('handles errors', (done) => {
      const FAKE_DETAILS = [];

      function FakePlacesService() {
        return {
          getDetails(config, callback) {
            expect(config.placeId).toBe('place_id');
            callback(FAKE_DETAILS, 'ERROR');
          }
        };
      }

      window.google = {
        maps: {
          places: {
            PlacesService: FakePlacesService,
            PlacesServiceStatus: {
              OK: 'OK',
              ERROR: 'ERROR'
            }
          },
          Map: jest.fn()
        }
      };

      getPlaceDetails('place_id')
        .then(
          () => {
            expect(false).toBe(true, 'Resolve callback should not be called');
            done();
          },
          (status) => {
            expect(status).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('getPlaceDetailsByAddress', () => {
    let fetchSpy;

    const FAKE_DETAILS = {
      results: [
        {
          address_components: [
            {
              long_name: 'Dene Road',
              short_name: 'Dene Rd',
              types: ['route']
            },
            {
              long_name: 'Andover',
              short_name: 'Andover',
              types: ['postal_town']
            },
            {
              long_name: 'Hampshire',
              short_name: 'Hampshire',
              types: ['administrative_area_level_2', 'political']
            },
            {
              long_name: 'England',
              short_name: 'England',
              types: ['administrative_area_level_1', 'political']
            },
            {
              long_name: 'United Kingdom',
              short_name: 'GB',
              types: ['country', 'political']
            },
            {
              long_name: 'SP10 2AA',
              short_name: 'SP10 2AA',
              types: ['postal_code']
            }
          ],
          formatted_address: 'Dene Rd, Andover SP10 2AA, UK',
          geometry: {
            bounds: {
              northeast: {
                lat: 51.20601449999999,
                lng: -1.4751782
              },
              southwest: {
                lat: 51.20452220000001,
                lng: -1.4767177
              }
            },
            location: {
              lat: 51.2052261,
              lng: -1.4760052
            },
            location_type: 'GEOMETRIC_CENTER',
            viewport: {
              northeast: {
                lat: 51.2066173302915,
                lng: -1.474598969708498
              },
              southwest: {
                lat: 51.20391936970851,
                lng: -1.477296930291502
              }
            }
          },
          place_id: 'ChIJVRDjSKQHdEgRCvyomZ5AQEo',
          types: ['route']
        }
      ],
      status: 'OK'
    };

    beforeEach(() => {
      fetchSpy = jest.fn().mockReturnValue(
        Promise.resolve({
          json: () => Promise.resolve(FAKE_DETAILS)
        })
      );

      global.fetch = fetchSpy;
    });

    it('returns place details', (done) => {

      getPlaceDetailsByAddress('SP102AA')
        .then((details) => {
          expect(details).toEqual(FAKE_DETAILS);

          // eslint-disable-next-line max-len
          expect(fetchSpy).toHaveBeenCalledWith('https://maps.googleapis.com/maps/api/geocode/json?key=component.google-maps.api_key&address=SP102AA');

          done();
        });
    });

  });

  describe('extractAddressComponent', () => {

    it('returns empty array for empty address components', () => {
      expect(extractAddressComponent([], 'whatever')).toEqual([]);
    });

    it('returns correct components', () => {
      const addressComponents = [
        {
          long_name: 'M20',
          short_name: 'M20',
          types: ['route']
        },
        {
          long_name: 'Sellindge',
          short_name: 'Sellinge',
          types: ['locality', 'political']
        }
      ];

      expect(extractAddressComponent(addressComponents, 'route'))
        .toEqual([
          {
            long_name: 'M20',
            short_name: 'M20',
            types: ['route']
          }
        ]);

      expect(extractAddressComponent(addressComponents, 'political'))
        .toEqual([
          {
            long_name: 'Sellindge',
            short_name: 'Sellinge',
            types: ['locality', 'political']
          }
        ]);

    });
  });

});
