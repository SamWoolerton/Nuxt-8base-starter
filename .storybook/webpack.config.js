const path = require("path")

module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:s?c|sa)ss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.dirname(path.resolve(__dirname)),
      "~": path.dirname(path.resolve(__dirname))
    }
  }
}
