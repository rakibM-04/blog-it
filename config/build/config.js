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
  components: absolutePath("src/components"),
  assets: absolutePath("../assets"),
  utils: absolutePath("src/utils"),
  translations: absolutePath("src/translations"),
  routes: absolutePath("src/routes.js"),
  neetoui: absolutePath("../../node_modules/@bigbinary/neetoui"),
  "neeto-icons": absolutePath("../../node_modules/@bigbinary/neeto-icons"),
  "neetoui/formik": absolutePath("node_modules/@bigbinary/neetoui/formik"),
};

export { alias };
