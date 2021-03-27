// require("dotenv").config({ path: "ENV_FILENAME" });
const env = require("./env-config.js");

module.exports = {
  env: {
    NEXT_PUBLIC_MONGODB_URL: process.env.MONGODB_URL,
  },
};
