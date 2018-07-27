import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Wrapper which uses `ReactDOM.createPortal()` function.
 *
 * Wrap any component into `Portal` and it will be rendered as child node of `domNode`.
 *
 * [See React Portals documentation for more info](https://reactjs.org/docs/portals.html)
 */
const Portal = props => createPortal(
  props.children,
  props.domNode
);

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  domNode: PropTypes.instanceOf(Element).isRequired
};

/** @component */
export default Portal;
