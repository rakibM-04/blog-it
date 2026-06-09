import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  commons: absolutePath("src/components/commons"),
  components: absolutePath("src/components"),
  assets: absolutePath("../assets"),
  utils: absolutePath("src/utils"),
  translations: absolutePath("src/translations"),
  routes: absolutePath("src/routes.js"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  stores: absolutePath("src/stores"),
  channels: absolutePath("src/channels"),
  neetoui: "@bigbinary/neetoui",
  neetoicons: "@bigbinary/neeto-icons",
  neetocist: "@bigbinary/neeto-cist",
  reactquery: "@tanstack/react-query",
  neetomolecules: "@bigbinary/neeto-molecules",
};

export { alias };
