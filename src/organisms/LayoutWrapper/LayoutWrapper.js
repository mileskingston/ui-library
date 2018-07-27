import React from 'react';
import PropTypes from 'prop-types';

require('./LayoutWrapper.styl');

const LayoutWrapper = ({ children, wrapperName }) => (
  <div
    className="LayoutWrapper"
    data-element={wrapperName}
  >
    <div className="layout-content">
      {children}
    </div>
  </div>
);

LayoutWrapper.displayName = 'LayoutWrapper';

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperName: PropTypes.string.isRequired
};

export default LayoutWrapper;
