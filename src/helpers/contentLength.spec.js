/* global describe, it */
import React from 'react';

import contentLength from './contentLength';

describe('contentLength helper', () => {

  describe('returns 12 for all following strings', () => {
    [
      [
        'Hello World!',
        (<span>Hello World!</span>)
      ],
      [
        'Hello <b>World!</b>',
        (<span>Hello <b>World!</b></span>)
      ],
      [
        'Hello <a href="foo.html"><b>World!</b></a>',
        (<span>Hello <a href="foo.html"><b>World!</b></a></span>)
      ],
      [
        '<i>Hello <a href="foo.html"><b>World!</b></a></i>',
        (<span><i>Hello <a href="foo.html"><b>World!</b></a></i></span>)
      ],
      [
        '<i>Hello <a href="foo.html"><b>World!</b></a></i>',
        '<i>Hello <a href="foo.html"><b>World!</b></a></i>'
      ]
    ].forEach(([stringContent, jsxContent]) => {
      it(stringContent, () => {
        if (typeof jsxContent === 'string') {
          expect(contentLength(jsxContent)).toBe(12);
        } else {
          expect(contentLength(jsxContent.props.children)).toBe(12);
        }
      });
    });
  });

  it('correctly triggers `onStep` callback', () => {
    let steps = 0;
    const foundElements = [];

    contentLength(
      (<span>Foo <a>link</a></span>),
      (element) => {
        steps++;
        foundElements.push(element.type);
      }
    );

    expect(steps).toBe(2);
    expect(foundElements).toEqual(['span', 'a']);
  });

  it('calls `onStep` callback with link element when html string is used', () => {
    let steps = 0;
    const foundElements = [];

    contentLength(
      'Hello <a href="world.html">world!</a>',
      (element) => {
        steps++;
        foundElements.push(element.type);
      }
    );

    expect(steps).toBe(1);
    expect(foundElements).toEqual(['a']);
  });

});
