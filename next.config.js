// require("dotenv").config();

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = {
  env: {
    NEXT_PUBLIC_MONGODB_URL: process.env.MONGODB_URL,
  },
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //      (config.node = {
  //       fs: "empty",
  //     });
  //   }
  // },

  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.node = {
  //     fs: "empty",
  //   };
  //   return config;
  // },
};
