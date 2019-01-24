import zip from "./utils/zip";

export default function collapse(strs, ...args) {
  return zip(strs, ...args)
    .join("")
    .replace(/(^\s+|\s+$)/gm, "")
    .replace(/\n/g, " ");
}
