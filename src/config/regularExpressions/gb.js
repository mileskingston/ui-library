/* eslint-disable max-len */
export default {
  ALPHANUMERIC: /^[0-9A-Z\s]*$/i,
  SPECIALALPHANUMERIC: /^[\x20-\x7E]*$/i,
  NUMERIC: /^[-+]?[0-9]*$/,
  ALPHA: /^[A-Z\s]*$/i,
  WHITE_SPACE: /^(?![\s]*$)/,
  POST_CODE: /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]{0,1} ?[0-9][a-zA-Z]{2}$/,
  POST_CODE_PROGRESSIVE: /^([a-zA-Z]{1,2}([0-9]{1,2}([a-zA-Z]{0,1}( ?([0-9]([a-zA-Z]{1,2})?)?)?)?)?)?$/,
  POSTAL_SECTOR: /^([A-Za-z0-9]{2,4} [0-9]{1})/,
  PHONE_NUMBER: /^(\+44|0)[0-9]{10,}$/i,
  EMAIL: /^[a-z0-9._+-]+@[a-z0-9._-]+\.[a-z]{2,4}$/i
};
