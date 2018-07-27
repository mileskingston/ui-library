import React from 'react';
import PropTypes from 'prop-types';
import './FixedContent.styl';

const FixedContent = ({ children, wrapperName }) => (
  <div
    data-component="FixedContent"
    data-element={wrapperName}
  >
    {children}
  </div>
);

FixedContent.displayName = 'FixedContent';

FixedContent.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperName: PropTypes.string
};

FixedContent.defaultProps = {
  wrapperName: 'slide-wrapper'
};

export default FixedContent;
