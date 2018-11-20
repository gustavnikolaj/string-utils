export default function zip(strs, ...args) {
  return strs.map((str, i) => (args[i] ? str + args[i] : str));
}
