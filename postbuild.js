const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

delete packageJson.scripts;
delete packageJson.files;
delete packageJson.devDependencies;

fs.writeFileSync(
  "./dist/package.json",
  JSON.stringify(packageJson).replace(/dist\//g, ""),
  "utf-8"
);

fs.copyFileSync("./README.md", "./dist/README.md");
fs.copyFileSync("./LICENSE", "./dist/LICENSE");
