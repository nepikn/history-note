import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { basename, resolve } from "node:path";
import { merge } from "webpack-merge";

const projectName = basename(process.cwd());
const publicPath = `/${projectName}`;
console.log(projectName);

const commonConfig = {
  entry: "./index.js",
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
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
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
};

const productionConfig = {
  mode: "production",
  output: {
    publicPath,
  },
};

const developmentConfig = {
  mode: "development",
  output: {
    path: resolve("dist", projectName),
    clean: true,
    publicPath,
  },
  devServer: { static: "dist", watchFiles: "src/**/*", open: projectName },
  devtool: "inline-source-map",
};

export default (env, args) => {
  switch (env.WEBPACK_SERVE) {
    case undefined:
      return merge(commonConfig, productionConfig);
    case true:
      return merge(commonConfig, developmentConfig);
    default:
      throw new Error("No matching configuration was found!");
  }
};
