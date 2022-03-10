const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/js/canvas.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve("../dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
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
			template: "./src/public/index.html",
		}),
		new CleanWebpackPlugin(),
	],
};
