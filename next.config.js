const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");
const withVideos = require("next-videos");

// next.js configuration
const nextConfig = withPWA({
  pwa: {
    // disable: process.env.NODE_ENV === "development",
    disable: true,
    dest: "public",
  },
  future: {
    webpack5: true,
  },
  webpack: (configuration) => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader",
    });
    return configuration;
  },
});

module.exports = withPlugins(
  [withOptimizedImages, { optimizeImagesInDev: true }, withVideos],
  nextConfig
);
