var webpack = require("webpack");
var path = require("path");

module.exports = {
      entry: "./src/client/client.js",
      devtool: "source-map",
      output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
      ],
      resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
          react: path.resolve("./node_modules/react")
        }
      },
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel',
            include: [
              path.join(__dirname, "/src"),
              path.join(__dirname, "/node_modules")
            ],
            exclude: /node_modules\/(?!qs)/,
            query: {
              presets: ["react", "es2015", "stage-0"]
            }
          },
          {
            test: /\.json/,
            loader: "json-loader"
          },
          {
            test: /\.css$/,
            loader: "style!css"
          },
          {
            test: /\.sass/,
            loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
          },
          {
            test: /\.scss/,
            loader: "style-loader!css-loader!sass-loader?outputStyle=expanded"
          },
          {
            test: /\.less/,
            loader: "style-loader!css-loader!less-loader"
          },
          {
            test: /\.styl/,
            loader: "style-loader!css-loader!stylus-loader"
          },
          {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: "url-loader?limit=8192"
          }
        ]
      }
    }
