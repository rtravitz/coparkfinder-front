module.exports = {
  entry: "./assets/javascripts/parks.js",
  output: {
    path: __dirname,
    filename: "parks.bundle.js"
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
