import PropTypes from 'prop-types';
import React from 'react';
import './Box.styl';

function Box(props) {
  let classes = [];

  if (props.classes) {
    classes = props.classes.split(' ');
  }

  classes.push('dc-box');

  return (
    <div data-component="Box" className={classes.join(' ')}>
      {props.children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.string
};

Box.defaultProps = {
  classes: ''
};

Box.displayName = 'Box';

export default Box;
