/* global describe, it */
import formatPrice from './formatPrice';

describe('formatPrice', () => {

  it('formats to two decimals', () => {
    expect(formatPrice(100)).toBe('£1.00');
    expect(formatPrice(110)).toBe('£1.10');
    expect(formatPrice(101)).toBe('£1.01');
    expect(formatPrice(100.1)).toBe('£1.00');
    expect(formatPrice(110.1)).toBe('£1.10');
  });

  it('formats string amount', () => {
    expect(formatPrice('1.00')).toBe('£1.00');
    expect(formatPrice('1.10')).toBe('£1.10');
    expect(formatPrice('£1.01')).toBe('£1.01');
    expect(formatPrice('£1.00')).toBe('£1.00');
  });

  it('formats different currencies', () => {
    expect(formatPrice(100, true, 'EUR')).toBe('€1.00');
  });

});
