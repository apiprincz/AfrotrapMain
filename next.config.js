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
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, fs, webpack }
  ) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.node.isServer = {
      fs: true,
    };

    // Important: return the modified config
    return config;
  },
};
