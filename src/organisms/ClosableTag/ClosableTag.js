import React from 'react';
import PropTypes from 'prop-types';

import Close from '../Close/Close';
import './ClosableTag.styl';

function ClosableTag(props) {

  return (
    <span className="dc-closable-tag">
      <span className="dc-closable-tag__content">{props.children}</span>
      <Close
        tooltipText={props.closeButtonTooltipText ? props.closeButtonTooltipText : null}
        onClose={props.onCloseClick}
      />
    </span>
  );

}

ClosableTag.displayName = 'ClosableTag';

ClosableTag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  closeButtonTooltipText: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired
};

ClosableTag.defaultProps = {
  closeButtonTooltipText: undefined
};

export default ClosableTag;
