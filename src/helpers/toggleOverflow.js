export const overflowClass = 'dc-overflow-hidden';
const elementsCache = {};

export default function toggleOverflow(selector, overflowHidden = true) {
  if (!elementsCache[selector]) {
    elementsCache[selector] = document.querySelector(selector);
  }

  elementsCache[selector].classList.toggle(overflowClass, overflowHidden);
}
