// require("dotenv").config({ path: "ENV_FILENAME" });
const env = require("./env-config.js");
require("dotenv").config();

module.exports = {
  env: {
    NEXT_PUBLIC_MONGODB_URL: process.env.MONGODB_URL,
  },
};
