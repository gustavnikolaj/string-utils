const zip = (strs, ...args) =>
  strs.map((str, i) => (args[i] ? str + args[i] : str));

export default function qw(strs, ...args) {
  return zip(strs, ...args)
    .join("")
    .split(/\s+/)
    .filter(item => item);
}
