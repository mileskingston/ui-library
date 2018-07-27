/* global describe, it */
import toggleOverflow, { overflowClass } from './toggleOverflow';

describe('toggleOverflow', () => {
  const selector = 'body';
  const element = document.querySelector(selector);

  it(`adds ${overflowClass} class to specified element`, () => {
    expect(element.classList.contains(overflowClass)).toBe(false);
    toggleOverflow(selector, true);
    expect(element.classList.contains(overflowClass)).toBe(true);
  });

  it(`removes ${overflowClass} class from specified element`, () => {
    toggleOverflow(selector, false);
    expect(element.classList.contains(overflowClass)).toBe(false);
  });
});
