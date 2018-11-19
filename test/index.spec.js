import expect from "unexpected";
import * as stringUtils from "../src/index";
import deindent from "../src/deindent";

describe("main module export", () => {
  it("should export the deindent method", () => {
    expect(stringUtils, "to satisfy", {
      deindent: expect.it("to be", deindent)
    });
  });
});
