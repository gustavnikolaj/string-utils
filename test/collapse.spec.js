import expect from "unexpected";
import collapse from "../src/collapse";

it("should collapse whitespace at the beginning and end of a string", () => {
  expect(
    collapse`
      foo
    `,
    "to equal",
    "foo"
  );
});

it("should work on a longer string", () => {
  expect(
    collapse`
      This is a very long string that I rather not have to put in a single
      line because then it would make my code spill over and take more than
      the 80 characters per line that I prefer.
    `,
    "to equal",
    "This is a very long string that I rather not have to put in a single " +
      "line because then it would make my code spill over and take more than" +
      " the 80 characters per line that I prefer."
  );
});

it("should work on a longer string with placeholders", () => {
  const p1 = "foo";
  const p2 = "bar";

  expect(
    collapse`
      This is an uncomfortably long string with a placeholder which value
      is "${p1}" and another placeholder which value is "${p2}".
    `,
    "to equal",
    `This is an uncomfortably long string with a placeholder which value is ` +
      `"foo" and another placeholder which value is "bar".`
  );
});
