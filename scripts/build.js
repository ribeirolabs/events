const { build } = require("esbuild");

function exit() {
  process.exit(1);
}

const config = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  logLevel: "info",
};

const browser = {
  ...config,
  platform: "browser",
  minify: true,
};

build({
  ...config,
  outfile: "./dist/index.js",
  format: "cjs",
}).catch(exit);

build({
  ...browser,
  outfile: "./dist/index.browser.js",
  format: "iife",
  globalName: "ribeirolabs.events",
}).catch(exit);

build({
  ...browser,
  outfile: "./dist/index.mjs",
  format: "esm",
}).catch(exit);

build({
  ...config,
  entryPoints: ["./src/react/index.ts"],
  outfile: "./dist/react/index.js",
  format: "cjs",
  external: ["react", "."],
}).catch(exit);
