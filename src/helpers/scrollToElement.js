export default function scrollToElement(element, forcedOffset = 0) {
  function getOffsetTop(elem) {
    let offsetTop = 0;

    do {
      if (!Number.isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
      elem = elem.offsetParent;
    } while (elem);

    return offsetTop;
  }

  if (element) {
    window.scrollTo(0, getOffsetTop(element) - forcedOffset);
  }
}
