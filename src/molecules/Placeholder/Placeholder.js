import React from 'react';
import PropTypes from 'prop-types';
import './Placeholder.styl';

function Placeholder(props) {
  const classes = ['dc-placeholder'];

  if (props.loadingAnimation) {
    classes.push('dc-placeholder--loading');
  }

  return (
    <div className={classes.join(' ')} data-component="Placeholder">
      {props.withImage &&
        <div className="dc-placeholder__image" />
      }

      {props.withContent &&
        <div className="dc-placeholder__content">
          {[...Array(props.numberOfLines)].map((n, i) => (
            <div
              key={i}
              className="dc-placeholder__line"
              style={{
                width: `${
                props.randomLineWidth
                  // Random width between 50% and 100%
                  ? Math.floor(Math.random() * 50) + 50
                  // Static width
                  : props.staticLineWidths[i % props.staticLineWidths.length]
                  }%`
              }}
            />
          ))}
        </div>
      }
    </div>
  );
}

Placeholder.displayName = 'Placeholder';

Placeholder.propTypes = {
  withImage: PropTypes.bool,
  withContent: PropTypes.bool,
  loadingAnimation: PropTypes.bool,
  randomLineWidth: PropTypes.bool,
  staticLineWidths: PropTypes.arrayOf(PropTypes.number),
  numberOfLines: PropTypes.number
};

Placeholder.defaultProps = {
  withImage: false,
  withContent: false,
  loadingAnimation: false,
  randomLineWidth: false,
  staticLineWidths: [50, 85, 70, 55],
  numberOfLines: 4
};

export default Placeholder;
