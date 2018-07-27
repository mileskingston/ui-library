/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './SlidingContent.styl';

const SlidingContent = ({
  children, wrapperName, onOverlayClick, linkComponent
}) => (
  <div
    data-component="SlidingContent"
    data-element={wrapperName}
  >
    <linkComponent
      aria-label="Sliding Content"
      data-element="Overlay"
      onClick={onOverlayClick}
    />
    {children}
  </div>
);

SlidingContent.displayName = 'SlidingContent';

SlidingContent.propTypes = {
  children: PropTypes.node,
  onOverlayClick: PropTypes.func.isRequired,
  wrapperName: PropTypes.string,
  linkComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

SlidingContent.defaultProptypes = {
  linkComponent: props => <a {...props}>{props.children}</a> // eslint-disable-line react/prop-types
};

export default SlidingContent;
