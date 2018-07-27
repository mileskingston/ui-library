export default function debounce(func, wait, immediate) {
  let timeout;

  return function wrap(...args) {
    const context = this;
    const callNow = immediate && !timeout;

    function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
