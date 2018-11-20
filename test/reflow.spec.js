import expect from "unexpected";
import deindent from "../src/deindent";
import reflow from "../src/reflow";

describe("reflow", () => {
  it("should wrap lines to fit", () => {
    expect(
      reflow(30)`
        This is a very long string that is for sure longer than 30 characters.
      `,
      "to equal",
      deindent`
        This is a very long string
        that is for sure longer than
        30 characters.
      `
    );
  });

  it("should wrap lines to fit with paragraphs", () => {
    expect(
      reflow(30)`
        This is a very long string that is for sure longer than 30 characters.

        This is a very long string that is for sure longer than 30 characters.
      `,
      "to equal",
      deindent`
        This is a very long string
        that is for sure longer than
        30 characters.

        This is a very long string
        that is for sure longer than
        30 characters.
      `
    );
  });

  it("should wrap lines but not break sections quoted in backticks", () => {
    expect(
      reflow(30)`
        This is a very long string that is for sure
        \`this is in backticks and can as such not be broken into smaller segments\`
        longer than 30 characters.
      `,
      "to equal",
      deindent`
        This is a very long string
        that is for sure
        \`this is in backticks and can as such not be broken into smaller segments\`
        longer than 30 characters.
      `
    );
  });

  it("non template string api", () => {
    expect(
      reflow(
        `
          This is a very long string that is for sure longer than 30
          characters.
        `,
        30
      ),
      "to equal",
      deindent`
        This is a very long string
        that is for sure longer than
        30 characters.
      `
    );
  });

  it("should throw if passing a non number as width (function)", () => {
    expect(
      () => reflow("foo", "bar"),
      "to throw",
      "The width must be a positive number"
    );
  });

  it("should throw if passing a non number as width (template string)", () => {
    expect(
      () => reflow("foo")`barbar`,
      "to throw",
      "The width must be a positive number"
    );
  });
});
