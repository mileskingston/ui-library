export default function padLeft(string, targetLength, padString) {
  const padLength = targetLength - string.length;
  return padLength > 0
    ? Array(padLength + 1).join(padString).slice(0, padLength) + string
    : string;
}
