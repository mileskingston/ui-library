import settings from '../config/settings';

export function verifyGoogleMapsApiSetup() {
  if (
    typeof window.google === 'undefined' ||
    typeof window.google.maps === 'undefined'
  ) {
    if (!verifyGoogleMapsApiSetup.warned) {
      // eslint-disable-next-line no-console
      console.warn(
        'Google Maps APIs not available.' +
        'Ensure you setup Google Maps API script correctly.' +
        'See: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service#loading_the_library'
      );
      verifyGoogleMapsApiSetup.warned = true;
    }
    return false;
  }

  if (typeof window.google.maps.places === 'undefined') {
    if (!verifyGoogleMapsApiSetup.warned) {
      // eslint-disable-next-line no-console
      console.warn(
        'Google Maps Places APIs not available.' +
        'Ensure you have loaded "places" library.' +
        'See: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service#loading_the_library'
      );
      verifyGoogleMapsApiSetup.warned = true;
    }
    return false;
  }
  return true;
}

verifyGoogleMapsApiSetup.warned = false;

/**
 * Receives searchTerm and provides array of places to autocomplete.
 * Uses Google Maps places API
 *
 * @param {string} searchTerm
 * @param {array} types
 * @param {array} country
 * @return {Promise}
 */
export function autocompleteLocations(searchTerm, types = [], country = ['uk', 'im']) {
  if (!verifyGoogleMapsApiSetup()) {
    return Promise.resolve([]);
  }

  const service = new window.google.maps.places.AutocompleteService();

  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      {
        input: searchTerm,
        location: new window.google.maps.LatLng({ lat: 0, lng: 0 }),
        radius: '20000000',
        componentRestrictions: { country },
        language: 'en-GB',
        types: types
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(predictions);
        } else {
          reject(status);
        }
      }
    );
  });
}

/**
 * Receives placeId and provides object of place details.
 *
 * @param {string} placeId
 * @return {Promise}
 */
export function getPlaceDetails(placeId) {
  if (!verifyGoogleMapsApiSetup()) {
    return Promise.resolve({});
  }

  const service = new window.google.maps.places.PlacesService(
    new window.google.maps.Map(document.createElement('div'))
  );

  return new Promise((resolve, reject) => {
    service.getDetails(
      { placeId },
      (details, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(details);
        } else {
          reject(status);
        }
      }
    );
  });
}

/**
 * Receives longitude and latitude and provides object of place details.
 *
 * @param {float} lat
 * @param {float} lng
 * @return {Promise}
 */
export function getPlaceDetailsByLocation(lat, lng) {
  if (!verifyGoogleMapsApiSetup()) {
    return Promise.resolve({});
  }

  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      {
        location: { lat, lng }
      },
      (results, status) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject(status);
        }
      }
    );
  });
}

/**
 * Receives address and provides object of place details.
 *
 * @param {string} address
 * @return {Promise}
 */
export function getPlaceDetailsByAddress(address) {
  // eslint-disable-next-line max-len
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${settings['component.google-maps.api_key'] || ''}&address=${address}`)
    .then(response => response.json());
}

/**
 * @param {Array} addressComponents
 * @param {string} component
 * @return {Array}
 */
export function extractAddressComponent(addressComponents, component) {
  return addressComponents.filter(
    addressComponent => addressComponent.types.indexOf(component) > -1
  );
}
