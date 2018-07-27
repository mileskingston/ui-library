export default function normalizePostCode(postCode) {
  const newPostCode = postCode.toUpperCase();

  if (newPostCode && newPostCode.charAt(newPostCode.length - 4) !== ' ') {
    return `${newPostCode.slice(0, -3)} ${newPostCode.slice(-3)}`;
  }

  return newPostCode;
}
