import { createStore } from 'redux'
import coreReducer from './reducer'

import { fromJS } from 'immutable'

//创建一个默认状态，这个状态将会从服务器发送给客户端
export const DEFAULT_STATE = fromJS({
  rooms: [{
    name:'公开房间', id:'0'
  }]
})

export function makeStore( state=DEFAULT_STATE ){
  //创建store有2个参数，一个reducer，另个是初始state
  return createStore( coreReducer, state)
}
