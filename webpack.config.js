import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "node:path";

const projectName = "online-note";
export default {
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: resolve(process.cwd(), `dist/${projectName}`),
    clean: true,
    publicPath: projectName,
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: projectName
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
      favicon: "src/asset/icon.svg",
      template: "src/index.html",
    }),
  ],
  devtool: "inline-source-map",
  devServer: { static: "dist", watchFiles: "src/**/*" },
  optimization: { runtimeChunk: "single" },
  mode: "production",
};
