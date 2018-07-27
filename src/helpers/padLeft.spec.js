import padLeft from './padLeft';

describe('padLeft', () => {

  it('works with single character padString', () => {
    expect(padLeft('X', 5, '0')).toBe('0000X');
    expect(padLeft('XY', 5, '0')).toBe('000XY');
  });

  it('works with multiple character padString', () => {
    expect(padLeft('X', 6, '01')).toBe('01010X');
  });

  it('returns the original string if targetLength is <= the original length', () => {
    expect(padLeft('XXXX', 3, '0')).toBe('XXXX');
  });

});
