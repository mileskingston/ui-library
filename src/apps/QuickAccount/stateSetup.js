import { withStateHandlers } from 'recompose';

/**
 * Simplifies the setup of state handling by creating initial state
 * and default state handlers from passed initialState object.
 * @param initialState
 * @returns withStateHandlers helper from recompose library
 */
export default (initialState) => {
  const stateUpdaters = {};

  Object.keys(initialState).forEach((stateItem) => {
    // For 'someStuff' state item will create 'setSomeStuff' handler
    stateUpdaters[`set${stateItem.charAt(0).toUpperCase()}${stateItem.slice(1)}`] =
      () => newState => ({ [stateItem]: newState });
  });

  return withStateHandlers(
    props => ({ ...initialState, view: props.initialView }),
    stateUpdaters
  );
};
