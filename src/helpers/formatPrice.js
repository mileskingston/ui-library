import constants from '../config/constants';

/**
 * Formats price received from API
 * @param {number|string} amount Price as received from the API.
 * (price integer or string - if currency sign is missing it will be added)
 * @param {bool} dividePriceBy100 price in case of number type should be divided by 100.
 * @param {string} currency in case of different currency than pound.
 * That's here because in New Checkout they receives price multiplied by 100 from backend
 * @returns {string} Price formatted to two decimals with the pound sign
 */
export default function formatPrice(amount, dividePriceBy100 = true, currency = 'GBP') {
  const { SYMBOL, ENTITY } = constants.CURRENCIES[currency];
  if (typeof amount === 'string') {
    const stringAmount = amount.replace(ENTITY, SYMBOL);

    return stringAmount.indexOf(SYMBOL) < 0
      ? `${SYMBOL}${stringAmount}`
      : stringAmount;
  }

  let priceStringParsedFromNumber;
  if (dividePriceBy100) {
    priceStringParsedFromNumber = `${SYMBOL}${(amount / 100).toFixed(2)}`;
  } else {
    priceStringParsedFromNumber = `${SYMBOL}${(amount).toFixed(2)}`;
  }

  return priceStringParsedFromNumber;
}
