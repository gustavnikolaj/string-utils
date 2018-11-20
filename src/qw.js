import zip from "./utils/zip";

export default function qw(strs, ...args) {
  return zip(strs, ...args)
    .join("")
    .split(/\s+/)
    .filter(item => item);
}
