import React from 'react';
import PropTypes from 'prop-types';

function Tab(props) {
  return (
    <li
      data-component="Tab"
      data-id={props.tabId}
      onClick={props.tabClickHandler}
      className={`dc-tab${props.active ? ' dc-tab-active' : ''}`}
    >
      <div className="dc-tab-line dc-background-primary" />
      <span
        data-element="TabText"
        className="dc-tab-text dc-clr-primary"
      >
        {props.label || props.title}
      </span>
    </li>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  tabId: PropTypes.number.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  tabClickHandler: PropTypes.func.isRequired,
  label: PropTypes.node,
  /**
   * @deprecated Use `label` instead
   */
  title: PropTypes.string
};

Tab.defaultProps = {
  active: false,
  disabled: false,
  label: null,
  title: ''
};

export default Tab;
