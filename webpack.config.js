module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: ["style-loader", "css-loader?modules", "sass-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
