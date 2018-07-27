/* global document */
import { parseRegExp } from '../helpers/regExpHelpers';

export function loadSettings(prefixesToRemove = []) {
  const settingsJSON = typeof window !== 'undefined'
    ? document.getElementById('app.settings')
    : undefined;
  let settings = {};

  if (settingsJSON) {
    try {
      settings = JSON.parse(settingsJSON.innerHTML);

      if (prefixesToRemove.length > 0) {
        Object.keys(settings).forEach((key) => {
          prefixesToRemove.forEach((prefix) => {
            if (key.indexOf(prefix) > -1) {
              settings[key.replace(prefix, '')] = key.indexOf('.regex') > -1
                ? parseRegExp(settings[key])
                : settings[key];
              delete settings[key];
            }
          });
        });
      }

    } catch (e) {
      /* eslint-disable no-console */
      console.error('Settings could not be loaded from page', e);
    }
  }

  return settings;
}

const defaultSettingsHandler = {
  get: (target, name) => (target.hasOwnProperty(name)
    ? target[name]
    : name)
};

const settings = loadSettings([
  'component.global.',
  'component.address.',
  'component.save-for-later.',
  'component.persistent-login.',
  'component.postcodeValidation.'
]);

export default typeof Proxy === 'function'
  ? new Proxy(settings, defaultSettingsHandler)
  : settings;
