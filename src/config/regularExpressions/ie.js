/* eslint-disable max-len */
export default {
  ALPHANUMERIC: /^[0-9A-Z\s]*$/i,
  SPECIALALPHANUMERIC: /^[\x20-\x7E]*$/i,
  NUMERIC: /^[-+]?[0-9]*$/,
  ALPHA: /^[A-Z\s]*$/i,
  WHITE_SPACE: /^(?![\s]*$)/,
  POST_CODE: /^[AC-FHKNPRTV-Y]{1}[0-9]{1}[0-9W]{1}[ -]?[0-9AC-FHKNPRTV-Y]{4}$/,
  POST_CODE_PROGRESSIVE: /^([AC-FHKNPRTV-Y][0-9]{0,2}|D6W)\s{0,1}([0-9AC-FHKNPRTV-Y]{0,4})?$/,
  POSTAL_SECTOR: /^\b([AC-FHKNPRTV-Y][0-9]{2}|D6W)\s{0,1}[0-9AC-FHKNPRTV-Y]{4}\b$/,
  PHONE_NUMBER: /^(\+353(\(0\))?|0)(\s*\d){7,}$/i,
  EMAIL: /^[a-z0-9._+-]+@[a-z0-9._-]+\.[a-z]{2,4}$/i
};
