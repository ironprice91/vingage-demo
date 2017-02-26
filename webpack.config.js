const DashboardPlugin = require("webpack-dashboard/plugin");
const webpack = require("webpack");
const PROD = process.env.NODE_ENV === "production" ? true : false;
const path = require("path");

module.exports = {
  entry: getEntrySources([
    path.resolve('./public/src/index.js')
  ]),
  output: {
    path: __dirname + "/public/scripts",
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1'],
      include: path.join(__dirname, 'public/src')
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
		new DashboardPlugin()
	],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('./'),
    proxy: {
       "**": "http://localhost:6060"
    },
  }
};

function getEntrySources(sources) {
	if (!PROD ) {
		sources.push('webpack/hot/only-dev-server');
	}

	return sources;
}
