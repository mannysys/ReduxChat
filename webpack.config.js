var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    // for hot loader: WebpackDevServer host and port
		"webpack-dev-server/client?http://localhost:8080",
		// for hot loader: "only" prevents reload on syntax errors
		"webpack/hot/only-dev-server",
		// 应用程序入口文件
		"./src/client/index.js"
  ],
  module: {  //匹配的js和jsx文件做预处理转换
    loaders:[{
			test:/\.jsx?$/,
			include: path.join(__dirname,"src"),
			loaders: ["react-hot-loader","babel-loader"],
		}]
  },
  resolve:{
		extensions:[".js",".jsx"]
	},
	output:{  //输出打包后的文件
		path: __dirname + "/public/build",
		filename:"boundle.js",
		publicPath:"http://localhost:8080/build", //webpack打包所有文件后放入到内存，指定该地址就可以访问到
	},
  //用于将打包好的文件返回给浏览器
	devServer: {
		contentBase: "./public", //静态文件位置
		hot: true,
		host:"localhost",
		proxy:{
			"*": "http://localhost:"+3000  //将前端所有请求通过代理发送到后端监听3000端口地址
		}
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]




}
