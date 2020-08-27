module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: ["workerize-loader", "ts-loader"]
      },
      {
        test: /\.worker2\.ts$/,
        use: ['worker-loader' , "ts-loader"],
      }
    ],
  },
}
