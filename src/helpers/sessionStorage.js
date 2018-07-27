/* This empty line must be here, otherwise the unit tests are failing. WTF? o_O */

export function saveToSessionStorage(name, value) {
  window.sessionStorage.setItem(
    name,
    typeof value === 'object' ? JSON.stringify(value) : value
  );
}

export function getFromSessionStorage(name) {
  const value = window.sessionStorage.getItem(name);
  let parsedValue = null;

  try {
    parsedValue = JSON.parse(value);
  } catch (e) {
    parsedValue = value;
  }

  return parsedValue;
}

export function removeFromSessionStorage(name) {
  window.sessionStorage.removeItem(name);
}
