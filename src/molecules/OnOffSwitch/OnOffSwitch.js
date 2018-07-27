import PropTypes from 'prop-types';
import React from 'react';
import './OnOffSwitch.styl';

function OnOffSwitch(props) {
  const classes = ['dc-on-off-switch'];

  if (props.active) {
    classes.push('dc-on-off-switch-active dc-background-primary');
  }

  return (
    <div
      data-component="OnOffSwitch"
      data-qa={props.qa}
      onClick={props.onSwitch}
      className="dc-on-off-switch-wrapper"
      id={props.id}
    >
      <span
        className={classes.join(' ')}
        style={{
          backgroundColor: props.active
            ? props.activeColor
            : undefined
        }}
      >
        <input
          type="checkbox"
          className="dc-hidden"
          name={props.name}
          checked={props.active}
          readOnly
        />
        <span className="dc-on-off-switch-label">{props.label}</span>
      </span>

      {props.description &&
        <span className="dc-on-off-switch-description">{props.description}</span>
      }
    </div>
  );
}

OnOffSwitch.displayName = 'OnOffSwitch';

OnOffSwitch.propTypes = {
  id: PropTypes.string,
  onSwitch: PropTypes.func.isRequired,
  name: PropTypes.string,
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.node,
  qa: PropTypes.string
};

OnOffSwitch.defaultProps = {
  id: undefined,
  active: false,
  activeColor: '#4855a0',
  name: 'switch',
  label: 'Off',
  description: '',
  qa: undefined
};

export default OnOffSwitch;
