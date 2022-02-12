const { build } = require("esbuild");

function exit() {
  process.exit(1);
}

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.js",
  logLevel: "info",
  format: "cjs",
  bundle: true,
}).catch(exit);

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.browser.js",
  logLevel: "info",
  format: "iife",
  globalName: "events",
  platform: "browser",
  minify: true,
}).catch(exit);

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.mjs",
  logLevel: "info",
  format: "esm",
  platform: "browser",
  minify: true,
}).catch(exit);

build({
  entryPoints: ["./src/react/index.ts"],
  outfile: "./dist/react/index.js",
  logLevel: "info",
  format: "cjs",
  bundle: true,
  external: ["react", "."],
}).catch(exit);
