import { stripTags } from './stringHelpers';

/* eslint max-len: ["error", { "ignoreComments": true }] */

function getArrayContentLength(content, onStep) {
  return content.reduce((reduction, part) => {
    if (typeof part === 'string') {
      return reduction + part.length;
    }
    if (typeof part === 'object') {
      onStep(part);
      return reduction + contentLength(part.props.children, onStep);
    }
    return reduction;
  }, 0);
}

/**
 * Calculates total length of string content of the React/JSX element.
 *
 * @param {string|Object|Array} content to be examined
 * @param {function} [onStep] callback which is called on every step of calculation and it receives the element which is being examined.
 * If content is string containing HTML it will be called only once if string contains an "a".
 * @return {number}
 */
export default function contentLength(content = '', onStep = () => {}) {
  if (content instanceof Array) {
    return getArrayContentLength(content, onStep);
  }

  if (typeof content === 'object') {
    onStep(content);
    return contentLength(content.props.children, onStep);
  }

  if (content.match(/<a([^>]*)>(.+)<\/a>/i)) {
    onStep({
      type: 'a'
    });
  }

  return stripTags(content).length;
}
