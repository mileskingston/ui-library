import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class Rollup extends PureComponent {

  constructor(props) {
    super(props);

    let forcedSteps = 0;
    if (props.ensureVisibleItemIndex) {
      const minimumItemsVisible = Math.max(props.initialCount, props.ensureVisibleItemIndex + 1);

      while ((props.initialCount + (forcedSteps * props.step)) < minimumItemsVisible) {
        forcedSteps++;
      }
    }

    this.state = {
      interactionHappened: false,
      visibleItemsCount: Math.min(
        props.items.length,
        props.initialCount + (forcedSteps * props.step)
      )
    };
  }

  componentWillReceiveProps({ initialCount: nextInitialCount, items: nextItems }) {
    const {
      props: {
        initialCount,
        items
      },
      state: {
        interactionHappened,
        visibleItemsCount
      }
    } = this;

    if (nextItems.length !== items.length) {
      this.setState({
        visibleItemsCount: Math.min(visibleItemsCount, nextItems.length)
      });
    }

    if (!interactionHappened && nextInitialCount !== initialCount) {
      this.setState({
        visibleItemsCount: Math.min(nextInitialCount, nextItems.length)
      });
    }
  }

  /**
   * @public
   */
  resetInteraction() {
    this.setState({
      interactionHappened: false
    });
  }

  render() {
    const {
      props: {
        children,
        items,
        initialCount
      },
      state: {
        visibleItemsCount
      }
    } = this;

    return children({
      items: items.slice(0, visibleItemsCount),
      totalItems: items.length,
      toDisplay: items.length - visibleItemsCount,
      toHide: visibleItemsCount - initialCount,
      displayMore: (e) => {
        if (e) {
          e.preventDefault();
        }

        this.setState(
          ({ visibleItemsCount: currentVisibleItemsCount }, { items: currentItems, step }) => ({
            interactionHappened: true,
            visibleItemsCount: Math.min(
              currentVisibleItemsCount + step,
              currentItems.length
            )
          })
        );
      },
      displayLess: (e) => {
        if (e) {
          e.preventDefault();
        }

        this.setState({
          interactionHappened: true,
          visibleItemsCount: initialCount
        });
      }
    });
  }

}

Rollup.displayName = 'Rollup';

Rollup.propTypes = {
  /**
   * Number of items displayed on initial render
   */
  initialCount: PropTypes.number.isRequired,

  /**
   * Complete array of items to display
   */
  items: PropTypes.arrayOf(PropTypes.any),

  /**
   * Function which receives resulting state calculated by Rollup parent component.
   * It receives object with following properties:
   *
   * - **items**: sliced array of items to display
   * - **totalItems**: number of items in initial list
   * - **toDisplay**: number of hidden items
   * - **toHide**: number of items which will hide when going back to initial state
   * - **displayMore**: function which can be called to reveal more items
   * - **displayLess**: function which can be called to hide items and return to initial state
   *
   */
  children: PropTypes.func.isRequired,

  /**
   * Number of items to reveal each time `displayMore` is called
   */
  step: PropTypes.number.isRequired,

  /**
   * Index of item which must be visible. If needed number of initially rendered items will be
   * modified to ensure list is expanded to display the required item.
   */
  ensureVisibleItemIndex: PropTypes.number
};

Rollup.defaultProps = {
  items: [],
  ensureVisibleItemIndex: undefined
};


export default Rollup;
