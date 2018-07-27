/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import Rollup from './Rollup';

const allItems = [1, 2, 3, 4, 5, 6, 7, 8];

describe('Rollup, ', () => {

  it('initializes correctly', () => {
    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={5}
      >
        {(state) => {
          expect(state).toMatchObject({
            items: [1, 2],
            totalItems: 8,
            toDisplay: 6,
            toHide: 0
          });

          return false;
        }}
      </Rollup>
    );
  });

  it('handles display more correctly', () => {
    let resultState = {};

    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={5}
      >
        {(state) => {
          resultState = state;

          return false;
        }}
      </Rollup>
    );

    resultState.displayMore();

    expect(resultState).toMatchObject({
      items: [1, 2, 3, 4, 5, 6, 7],
      totalItems: 8,
      toDisplay: 1,
      toHide: 5
    });

    resultState.displayMore();

    expect(resultState).toMatchObject({
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      totalItems: 8,
      toDisplay: 0,
      toHide: 6
    });

    resultState.displayLess();

    expect(resultState).toMatchObject({
      items: [1, 2],
      totalItems: 8,
      toDisplay: 6,
      toHide: 0
    });
  });

  it('ensureVisibleItemIndex does not affect initialCount', () => {
    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={5}
        ensureVisibleItemIndex={1}
      >
        {({ items }) => {
          expect(items.length).toBe(2);

          return null;
        }}
      </Rollup>
    );
  });

  it('ensureVisibleItemIndex affects initialCount by forcing 1 step', () => {
    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={5}
        ensureVisibleItemIndex={3}
      >
        {({ items }) => {
          expect(items.length).toBe(7);

          return null;
        }}
      </Rollup>
    );
  });

  it('ensureVisibleItemIndex affects initialCount by forcing 3 steps', () => {
    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={2}
        ensureVisibleItemIndex={6}
      >
        {({ items }) => {
          expect(items.length).toBe(8);

          return null;
        }}
      </Rollup>
    );
  });

  it('ensureVisibleItemIndex affects initialCount but is constrained by items count', () => {
    mount(
      <Rollup
        items={allItems}
        initialCount={2}
        step={3}
        ensureVisibleItemIndex={8}
      >
        {({ items }) => {
          expect(items.length).toBe(8);

          return null;
        }}
      </Rollup>
    );
  });

});
