import expect from "unexpected";
import deindent from "../src/deindent";

describe("deindent", () => {
  it("should be a function", () => {
    expect(deindent, "to be a function");
  });

  it("should remove indentation from a string", () => {
    const str = deindent`
      deindent
    `;

    expect(str, "to equal", "deindent");
  });

  it("should remove indentation from a multiline string", () => {
    const str = deindent`
      foo bar
      qux baz
    `;

    expect(str, "to equal", "foo bar\nqux baz");
  });

  it("should not remove additional indentation from a multiline string", () => {
    const str = deindent`
      foo bar
        qux baz
    `;

    expect(str, "to equal", "foo bar\n  qux baz");
  });

  it("should not remove additional linebreaks from a multiline string", () => {
    const str = deindent`
      foo bar

        qux baz
    `;

    expect(str, "to equal", "foo bar\n\n  qux baz");
  });

  it("should remove the right amount of indentation", () => {
    const str = deindent`
      foo
        bar
          qux
      baz
    `;

    expect(str, "to equal", "foo\n  bar\n    qux\nbaz");
  });

  it("should only remove the first line with no non-whitespace contents", () => {
    const str = deindent`

      foo
      bar
    `;

    expect(str, "to equal", "\nfoo\nbar");
  });

  it("should only remove the last line with no non-whitespace contents", () => {
    const str = deindent`
      foo
      bar

    `;

    expect(str, "to equal", "foo\nbar\n");
  });

  it("should leave newlines expect at the end and start", () => {
    const str = deindent`


    `;

    expect(str, "to equal", "\n");
  });

  it("should still clean trailing whitespace when the first line has no indentation", () => {
    const str = deindent`foo
      bar
    `;

    expect(str, "to equal", "foo\n      bar");
  });

  it("should not break with an empty string", () => {
    const str = deindent``;

    expect(str, "to equal", "");
  });

  it("should work with variables", () => {
    const placeholder = "FOO BAR";
    const str = deindent`
      foo
        ${placeholder}
      bar
    `;

    expect(str, "to equal", "foo\n  FOO BAR\nbar");
  });

  describe("when used as a regular function", () => {
    it("should remove indentation from a string", () => {
      const str = deindent(`
        deindent
      `);

      expect(str, "to equal", "deindent");
    });
  });
});
