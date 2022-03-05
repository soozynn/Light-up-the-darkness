const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/index.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve("./dist"),
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
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CleanWebpackPlugin(),
	],
};
