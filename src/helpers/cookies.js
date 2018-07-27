export function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));

  return match ? match[2] : '';
}

export function setCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  let expires;

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;

  } else {
    expires = '';
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}
