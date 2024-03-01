import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "node:path";

const projectName = "online-note";
export default {
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: resolve(process.cwd(), `dist/${projectName}`),
    clean: true,
    publicPath: `/${projectName}`,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: [autoprefixer] } },
          },
          "sass-loader",
        ],
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
  devServer: { static: "dist", watchFiles: "src/**/*", open: projectName },
  optimization: { runtimeChunk: "single" },
  mode: "production",
};
