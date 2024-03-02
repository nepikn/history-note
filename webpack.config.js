import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as nodePath from "node:path";

const projectName = "online-note";
export default (env) => {
  const path = env.WEBPACK_SERVE
    ? nodePath.join(process.cwd(), `dist/${projectName}`)
    : undefined;
  return {
    entry: "./index.js",
    output: {
      path,
      clean: true,
      publicPath: `/${projectName}`,
    },
    devServer: { static: "dist", watchFiles: "src/**/*", open: projectName },
    devtool: "inline-source-map",
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
    mode: "production",
  };
};
