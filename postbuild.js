const fs = require("fs");

const packageJson = fs.readFileSync("./package.json", "utf-8");

fs.writeFileSync(
  "./dist/package.json",
  packageJson.replace(/dist\//g, ""),
  "utf-8"
);
