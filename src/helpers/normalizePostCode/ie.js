export default function normalizePostCode(postCode) {
  const newPostCode = postCode
    .toUpperCase()
    .replace(' ', '');

  return `${newPostCode.slice(0, -4)} ${newPostCode.slice(-4)}`;
}
