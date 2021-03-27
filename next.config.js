// require("dotenv").config();

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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.node = {
      fs: false,
    };

    // Important: return the modified config
    return config;
  },
};
