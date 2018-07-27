/**
 * If value is string, extract flags, remove opening and ending slashes
 * and converted it to RegExp
 * @param regExpString
 * @returns {RegExp}
 */
export function parseRegExp(regExpString) {
  if (typeof regExpString !== 'string') {
    return regExpString;
  }

  // Find all flags preceded by '/'
  const matches = regExpString.match(/\/([gimuy]{0,5})$/);
  const flags = matches ? matches[1] : '';
  let newRegExpString = regExpString;

  if (matches !== null) {
    // Remove first and last '/' and flags
    newRegExpString = newRegExpString.slice(1, -(flags.length + 1));
  }

  return new RegExp(newRegExpString, flags);
}
