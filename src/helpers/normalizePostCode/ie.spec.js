/* global describe, it */
import normalizePostCode from './ie';

describe('normalizePostCode', () => {

  it('formats post code to standard IE format', () => {
    expect(normalizePostCode('K67DE72')).toBe('K67 DE72');
    expect(normalizePostCode('k67 dE72')).toBe('K67 DE72');
    expect(normalizePostCode('k67De72')).toBe('K67 DE72');
  });

});
