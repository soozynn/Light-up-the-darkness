const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: path.resolve(__dirname, "./src/canvas.js"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]?[hash]",
						},
					},
				],
			},
			{
				test: /\.(mp3|wav)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "audio",
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|pages)/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./src/index.html"),
		}),
		new MiniCssExtractPlugin({ filename: `[name].css` }),
		new CleanWebpackPlugin(),
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
	},
};
