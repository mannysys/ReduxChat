import express from 'express'
import { Server } from 'http'

var app = express()
var http = Server( app )

// configs 获取根目录
var rootPath = require('path').normalize(__dirname + '/../..')
app.set('views', __dirname + '/views') // 设置渲染引擎
app.set('view engine', 'ejs')
app.use(express.static( rootPath + '/public')) // 指定使用静态文件目录


var io = require('socket.io')(http)
import { makeStore } from './store'
import listenWebSocket from './io'

const store = makeStore()  // 创建store（初始数据）
listenWebSocket( io, store )



app.get('/', (req, res) => {
  res.render('index')
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
