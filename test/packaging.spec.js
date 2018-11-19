import expect from "unexpected";
import path from "path";
import fs from "fs";
import pkgJson from "../package.json";

const srcPath = path.resolve(__dirname, "../src");

describe("packaging setup", () => {
  it("all files in src must be included in package.json files property", () => {
    const filesInSrc = fs.readdirSync(srcPath);

    return expect(pkgJson, "to satisfy", {
      files: expect.it("to contain", ...filesInSrc)
    });
  });

  it("all files in package.json files property must exist in src", () => {
    const filesInSrc = fs.readdirSync(srcPath);

    return expect(filesInSrc, "to contain", ...pkgJson.files);
  });
});
