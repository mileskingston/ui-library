import contentLength from './contentLength';

/**
 * @param {string|Array|Object} content
 * @returns {number}
 */
export default function staticTimeoutResolver(content) {
  let timeout = 0;
  let hasLink = false;
  const length = contentLength(content, (element) => {
    if (!hasLink) {
      hasLink = typeof element === 'object' && element.type === 'a';
    }
  });

  if (length <= 40) {
    timeout = 3000;
  }

  if (length > 40 && length <= 80) {
    timeout = 5000;
  }

  if (length > 80 && length) {
    timeout = 7000;
  }

  if (hasLink) {
    timeout += 2000;
  }

  return timeout;
}
