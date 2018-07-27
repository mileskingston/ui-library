import { capitalize, camelToDash, truncateText, stripTags } from './stringHelpers';

describe('capitalize', () => {

  it('returns correct value', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('hello world!')).toBe('Hello World!');
    expect(capitalize('hello World!')).toBe('Hello World!');
  });

});

describe('camelToDash', () => {

  it('returns correct value', () => {
    expect(camelToDash('helloWorld')).toBe('hello-world');
    expect(camelToDash('helloUK')).toBe('hello-uk');
    expect(camelToDash('helloFBI')).toBe('hello-fbi');
  });

});

describe('truncateText', () => {

  it('returns correct value', () => {
    expect(truncateText('hello world', 5)).toBe('he...');
    expect(truncateText('hello world', 11)).toBe('hello wo...');
  });

});

describe('stripTags', () => {

  it('returns correct value', () => {
    expect(stripTags('<a href="foo">Foo</a>')).toBe('Foo');
    expect(stripTags('<a href="foo">Foo</a> <strong>Bar</strong>')).toBe('Foo Bar');
  });

});
