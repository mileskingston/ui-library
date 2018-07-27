import { settings, translations } from '../../../';
import {
  EVENT_FULL_LIST,
  EVENT_ALREADY_IN_LIST,
  STATUS_SUCCESS,
  STATUS_FULL_LIST,
  STATUS_ALREADY_IN_LIST
} from './constants';

export function extractMessages(messages, params = {}) {
  return messages
    .map(message => translations[message])
    .map((translation) => {
      Object.keys(params).forEach((key) => {
        translation = translation.replace(`[${key}]`, params[key]);
      });

      return translation;
    })
    .join(' ');
}

export function getResultFromRespose(events, wishlistProductUrl) {
  const result = {};

  if (events.indexOf(EVENT_FULL_LIST) > -1) {
    result.savingResult = STATUS_FULL_LIST;
    result.message = extractMessages(
      ['quick_account_save_error_list_full'],
      { maxProductsCount: settings['max-products-count'] }
    );
    result.type = 'negative';

  } else if (events.indexOf(EVENT_ALREADY_IN_LIST) > -1) {
    result.savingResult = STATUS_ALREADY_IN_LIST;
    result.message = extractMessages(
      ['quick_account_save_error_already_in_list'],
      { wishlistProductUrl }
    );
    result.type = 'warning';

  } else {
    result.savingResult = STATUS_SUCCESS;
    result.message = translations.saving_success;
    result.type = 'positive';
    result.icon = 'Tick';
  }

  return result;
}
