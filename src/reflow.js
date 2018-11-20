function wrapTextToWidth(str, maximumWidth) {
  const wrappedParagraphs = [];

  // Process each of the paragraphs individually. Paragraphs should be
  // persisted, but linebreaks inside them should be rewrapped to make them fit.
  for (const paragraph of str.split("\n\n")) {
    let collapsedLine = "";

    // Build a collapsed line, where each of the line breaks is replaced with
    // spaces.
    for (let line of paragraph.split("\n")) {
      line = line.trim();
      collapsedLine += " " + line;
    }

    const words = [];
    const tokens = collapsedLine.split("");
    let index = 0;

    // Walk through the collapsed line and gather words (or other segments)
    // which should not be broken across multiple lines.
    while (index < tokens.length) {
      let nextIndex = index + 1;

      if (tokens[index] === "`") {
        let endsAt = -1;
        for (let i = index + 1; i < tokens.length; i++) {
          const char = tokens[i];
          if (char === "`") {
            endsAt = i;
            break;
          }
        }

        // if no matching backtick is found, treat it like normal text
        if (endsAt !== -1) {
          words.push(tokens.slice(index, endsAt + 1).join(""));
          nextIndex = endsAt + 1;
        }
      } else if (tokens[index] !== " ") {
        let word;

        for (let i = index; i < tokens.length; i++) {
          const char = tokens[i];
          if ([" "].includes(char)) {
            word = tokens.slice(index, i).join("");
            nextIndex = i;
            break;
          }
        }

        if (!word && !tokens.slice(index).includes(" ")) {
          // We're at the end of the collapsed string, and looking at the last word.
          word = tokens.slice(index).join("");
          nextIndex = tokens.length;
        }

        if (word) {
          words.push(word);
        }
      }

      index = nextIndex;
    }

    const lines = [];
    let currentLine = "";

    // Reconstruct lines that respect the maximum width.
    for (const word of words) {
      if (currentLine.length + word.length + 1 > maximumWidth) {
        lines.push(currentLine);
        currentLine = "";
      }

      currentLine += currentLine.length === 0 ? word : " " + word;
    }

    lines.push(currentLine);

    // Reassemble the paragraph
    wrappedParagraphs.push(lines.join("\n"));
  }

  return wrappedParagraphs.join("\n\n");
}

import deindent from "./deindent";

export default function reflow(str, width) {
  if (typeof width === "undefined") {
    width = str;
    str = undefined;
  }

  if (typeof width !== "number" || !(width > 0)) {
    throw new Error("The width must be a positive number");
  }

  if (str) {
    return wrapTextToWidth(deindent([str]), width);
  }

  return (strs, ...args) => {
    const str = deindent(strs, ...args);
    return wrapTextToWidth(str, width);
  };
}
