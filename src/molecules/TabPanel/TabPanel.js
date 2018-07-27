import React from 'react';
import PropTypes from 'prop-types';

function TabPanel(props) {
  return (
    <div data-component="TabPanel" className="dc-tab-panel">{props.children}</div>
  );
}

TabPanel.displayName = 'TabPanel';

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

export default TabPanel;
