const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/map.js",
    "./js/filter.js",
    "./js/card.js"
  ],
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
