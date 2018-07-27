/* global document */

export function loadLocales(prefixesToRemove = []) {
  const locale = typeof window !== 'undefined'
    ? document.getElementById('app.locale')
    : undefined;
  let locales = {};

  if (locale) {
    try {
      locales = JSON.parse(locale.innerHTML);

      if (prefixesToRemove.length > 0) {
        Object.keys(locales).forEach((key) => {
          prefixesToRemove.forEach((prefix) => {
            if (key.indexOf(prefix) > -1) {
              locales[key.replace(prefix, '')] = locales[key];
              delete locales[key];
            }
          });
        });
      }

    } catch (e) {
      /* eslint-disable no-console */
      console.error('Translations could not be loaded from page', e);
    }
  }

  return locales;
}

export function replacePlaceholders(text, params = {}) {
  let newText = text;

  Object.keys(params).forEach((key) => {
    newText = newText.split(key).join(params[key]);
  });

  return newText;
}


const defaultTranslationHandler = {
  get: (target, name) => (target.hasOwnProperty(name)
    ? target[name]
    : name)
};

const translations = loadLocales([
  'component.login.',
  'component.my-account.',
  'component.my-account-menu.',
  'component.save-for-later.',
  'component.location-finder.',
  'component.store-finder.',
  'component.view-switch.',
  'component.gdpr.'
]);

export default typeof Proxy === 'function'
  ? new Proxy(translations, defaultTranslationHandler)
  : translations;
