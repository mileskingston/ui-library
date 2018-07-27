import React from 'react';
import PropTypes from 'prop-types';
import './Ribbon.styl';

function Ribbon(props) {
  const classes = ['dc-ribbon', `dc-ribbon--${props.style}`, `dc-ribbon--${props.side}`];
  return (
    <div data-component="Ribbon" className={classes.join(' ')}>
      {props.label}
    </div>
  );
}

Ribbon.propTypes = {
  label: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['left', 'right']),
  style: PropTypes.oneOf(['default', 'info'])
};

Ribbon.defaultProps = {
  side: 'left',
  style: 'default'
};

export default Ribbon;
