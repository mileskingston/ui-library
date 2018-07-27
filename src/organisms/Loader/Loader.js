import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../molecules/Icon/Icon';
import './Loader.styl';

function Loader(props) {
  const classes = ['dc-loader', `dc-loader--${props.align}`, `dc-loader--${props.size}`];

  return (
    <div data-component="Loader" className={classes.join(' ')}>
      <Icon icon="Spinner" spin />
    </div>
  );
}

Loader.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Loader.defaultProps = {
  align: 'center',
  size: 'medium'
};

export default Loader;
