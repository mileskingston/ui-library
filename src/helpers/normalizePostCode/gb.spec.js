/* global describe, it */
import normalizePostCode from './gb';

describe('normalizePostCode', () => {

  it('formats post code to standard UK format', () => {
    expect(normalizePostCode('sp102aa')).toBe('SP10 2AA');
    expect(normalizePostCode('sP10 2aA')).toBe('SP10 2AA');
    expect(normalizePostCode('W36rs')).toBe('W3 6RS');
    expect(normalizePostCode('W3 6RS')).toBe('W3 6RS');
  });

});
