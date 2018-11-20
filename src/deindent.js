import zip from "./utils/zip";

export default function deindent(strs, ...args) {
  const str = zip(strs, ...args).join("");

  const lines = str.split("\n");
  let processedIndex = 0;
  let indentationOfFirstLine = null;

  while (typeof indentationOfFirstLine !== "number") {
    let firstLineCandidate = lines[processedIndex];

    // If the line has non-whitespace content
    if (firstLineCandidate.trim()) {
      const matches = firstLineCandidate.match(/^([ ]+)/);
      indentationOfFirstLine = matches ? matches[1].length : 0;
    }

    processedIndex += 1;
  }

  if (indentationOfFirstLine === 0) {
    // Just remove leading and trailing spaces.
    return str.trim();
  }

  const regexp = new RegExp(`^[ ]{${indentationOfFirstLine}}`);

  return lines
    .reduce((strs, line, index) => {
      if (strs.length === 0 && line.trim() === "") {
        return strs;
      }

      if (index + 1 === lines.length && line.trim() === "") {
        return strs;
      }

      strs.push(line.replace(regexp, ""));

      return strs;
    }, [])
    .join("\n");
}
