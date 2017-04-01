import ReactDOM from 'react-dom'
import React from 'react'
import {ConnectedApp} from './components/App'

import {Provider} from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import { logger, socketMiddleware } from './middleware'

import rootReducer from './reducer'
import { setState,newMessage } from './actionCreators'
import { getInitialState, saveToStorage } from './store'

import { socket } from "./io"


//加入中间件
const createStoreWithMiddleware = applyMiddleware(
  logger,
  socketMiddleware( socket )
)( createStore )

// 创建store
var store = createStoreWithMiddleware( rootReducer, getInitialState() )


//监听后端发送的 state数据
socket.on("state",state => {
  store.dispatch( setState(state) ) //接收到后端发来的数据，发送给前端数据中去
})
socket.on('message', message => {
  console.log('get message from server')
  //从服务器端过来的消息标识true
  store.dispatch( newMessage(message, true) )
})


console.log(store.getState())
// -------------------------------------------------


var $app = document.getElementById('app')

function render(){
 /*
  * Provider组件，可以让容器组件拿到 state
  * Provider在根组件外面包了一层，这样一来，App的所有子组件就可以拿到state了
  * 在任意子组件里面用 connect方法将子组件连接起来，以及可以调用 store里数据
  */
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>,
    $app
  )
}

render()

//每当状态发生改变时，就将数据保存本地存储 localStorage里
store.subscribe( () => {
  saveToStorage( store.getState() )
} ) 