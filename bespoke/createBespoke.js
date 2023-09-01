// import dox from "dox"

/* eslint-disable */
const fs = require("fs").promises;
const path = require("path");
const { parse } = require("comment-parser");

const createColor = require("./createColor.js");
const createComponents = require("./createComponents.js");

module.exports = (pluginOptions = {}) => async (nextConfig = {}) => {
  await createColor(pluginOptions?.colors);
  await createComponents();

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
