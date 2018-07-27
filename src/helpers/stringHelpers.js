export function capitalize(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function truncateText(string, allowedLength) {
  return `${string.substring(0, allowedLength - 3)}...`;
}

/**
 * @param {string} content
 * @return {string}
 *
 * @link https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
 */
export function stripTags(content) {
  return content
    .replace(/(<([^>]+)>)/ig, '');
}
