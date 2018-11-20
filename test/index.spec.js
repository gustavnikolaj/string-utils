import expect from "unexpected";
import { readdirSync } from "fs";
import { resolve, basename } from "path";
import * as stringUtils from "../src/index";
import { deindent } from "../src/deindent";

describe("main module export", () => {
  it("should export the deindent method", () => {
    expect(stringUtils, "to satisfy", {
      deindent: expect.it("to be", deindent)
    });
  });

  it("should export each of the other files in src", () => {
    const exportedFunctions = readdirSync(resolve(__dirname, "../src"))
      .filter(file => file !== "index.js" && file !== "utils")
      .map(filename => basename(filename, ".js"))
      .reduce((exportedFunctions, filename) => {
        exportedFunctions[filename] = expect.it("to be a function");
        return exportedFunctions;
      }, {});

    expect(stringUtils, "to satisfy", exportedFunctions);
  });
});
