const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");
const withVideos = require("next-videos");

const runtimeCaching = require("next-pwa/cache");
runtimeCaching[0].handler = "StaleWhileRevalidate";

// next.js configuration
const nextConfig = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["192.168.225.105:1337"],
  },
});

module.exports = withPlugins(
  [withOptimizedImages, { optimizeImagesInDev: true }, withVideos],
  nextConfig
);
