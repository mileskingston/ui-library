import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Icon } from '../../../';
import './ResultMessage.styl';

function ResultMessage(props) {
  if (!props.result.message) {
    return <noscript />;
  }

  return (
    <div className="dc-result-message">
      <Tooltip type={props.result.type} textAlign="center" radius>
        {props.result.icon &&
          <Icon icon={props.result.icon} />
        }
        <span dangerouslySetInnerHTML={{ __html: props.result.message }} />
      </Tooltip>
    </div>
  );
}

ResultMessage.propTypes = {
  result: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string
  })
};

ResultMessage.defaultProps = {
  result: {}
};

export default ResultMessage;
