import zip from "./utils/zip";

export default function deindent(strs, ...args) {
  const str =
    typeof strs === "string" && args.length === 0
      ? strs
      : zip(strs, ...args).join("");

  const lines = str.split("\n");
  let processedIndex = 0;
  let indentationOfFirstLine = null;

  while (
    typeof indentationOfFirstLine !== "number" &&
    processedIndex < lines.length
  ) {
    let firstLineCandidate = lines[processedIndex];

    // If the line has non-whitespace content
    if (firstLineCandidate.trim()) {
      const matches = firstLineCandidate.match(/^([ ]+)/);
      indentationOfFirstLine = matches ? matches[1].length : 0;
    }

    processedIndex += 1;
  }

  const regexp = new RegExp(`^[ ]{${indentationOfFirstLine}}`);

  let strippedLines =
    indentationOfFirstLine === 0
      ? lines
      : lines.map(line => line.replace(regexp, ""));

  if (strippedLines[0].trim() === "") {
    strippedLines = strippedLines.slice(1);
  }

  if (
    strippedLines.length > 0 &&
    strippedLines[strippedLines.length - 1].trim() === ""
  ) {
    strippedLines = strippedLines.slice(0, -1);
  }

  return strippedLines.join("\n");
}
