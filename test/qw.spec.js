import expect from "unexpected";
import qw from "../src/qw";

describe("qw", () => {
  it("should split a string into an array of words", () => {
    const blah = "hey";

    expect(
      qw`
        foo   bar
          quux   ${blah}   baz
      `,
      "to equal",
      ["foo", "bar", "quux", "hey", "baz"]
    );
  });
});
