export function resolveByCountry(gb, ie) {
  if (typeof COUNTRY === 'undefined') {
    global.COUNTRY = 'GB';
  }

  return COUNTRY === 'IE' ? ie : gb;
}
