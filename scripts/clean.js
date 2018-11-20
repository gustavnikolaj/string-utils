import path from "path";
import pkgJson from "../package.json";
import rimraf from "rimraf";

const itemsToDelete = [...pkgJson.files, "coverage", ".nyc_output"];

for (const item of itemsToDelete) {
  const itemPath = path.resolve(__dirname, "..", item);
  rimraf.sync(itemPath);
}
