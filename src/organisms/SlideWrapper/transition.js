let transitionEndPropertyName = null;

export function getTransitionEndProperty() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (transitionEndPropertyName) {
    return transitionEndPropertyName;
  }

  let name = null;
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      name = transitions[t];
      break;
    }
  }

  transitionEndPropertyName = name;
  return transitionEndPropertyName;
}
