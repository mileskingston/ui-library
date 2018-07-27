import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { H3, List, Tooltip } from '../../../';
import './Benefits.styl';

function Benefits(props) {
  const Wrapper = props.viewInTooltip ? Tooltip : Fragment;
  const wrapperProps = props.viewInTooltip ? { type: 'tip', arrow: props.arrow, small: true } : {};

  return (
    <div className="dc-benefits">
      <Wrapper {...wrapperProps}>
        {props.title &&
          <H3>{props.title}</H3>
        }

        <List items={props.list} />
      </Wrapper>
    </div>
  );
}

Benefits.propTypes = {
  arrow: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  viewInTooltip: PropTypes.bool
};

Benefits.defaultProps = {
  arrow: undefined,
  title: undefined,
  viewInTooltip: false
};

export default Benefits;
