import zip from "./utils/zip";

export default function collapse(strs, ...args) {
  return (
    zip(strs, ...args)
      // get the full string
      .join("")
      // do a multiline trim
      .replace(/^\s+/gm, "")
      .replace(/\s+$/gm, "")
      // join the lines, compatible with collapse
      .replace(/\n/g, " ")
      // trim the dangling line ends
      .trim()
  );
}
