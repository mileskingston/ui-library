import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon/Icon';
import './List.styl';

function List(props) {
  let classes = [];

  if (props.classes) {
    classes = props.classes.split(' ');
  }

  classes.push('dc-list');
  return (
    <ul data-component="List" className={classes.join(' ')}>
      {props.items.map((item, i) => {
        if (typeof item === 'string') {
          return (
            <li className="dc-list__item" key={i}>
              {props.icon !== 'false' &&
                <span>
                  <Icon icon={props.icon} />
                </span>
              }
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          );
        }

        return (
          <li className="dc-list__item" key={i} data-qa={item.qa}>
            {props.icon !== 'false' &&
              <span>
                <Icon icon={item.icon || props.icon} />
              </span>
            }
            <span dangerouslySetInnerHTML={{ __html: item.content }} />
          </li>
        );
      })}
    </ul>
  );
}

List.displayName = 'List';

List.propTypes = {
  classes: PropTypes.string,

  /**
   * List of items. Can be simple string, then `icon` is used for item icon. If object with
   * `icon` and `content` properties is passed, it uses custom icon for item.
   */
  items: PropTypes.arrayOf(PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.shape({
        content: PropTypes.string,
        icon: PropTypes.string,
        qa: PropTypes.string
      })
    ]
  )).isRequired,

  /**
   * Icon used for each list item
   */
  icon: PropTypes.string
};

List.defaultProps = {
  classes: '',
  icon: 'Tick'
};

export default List;
