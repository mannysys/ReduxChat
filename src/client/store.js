import {Map,fromJS} from "immutable"

const STATE_KEY = "CHAT_APP_STATE"

export function saveToStorage( state ){
  //检查对象是否是immutable 如果是就转换普通js对象然后转换成字符串的json
  var data = JSON.stringify(state.toJS ? state.toJS() : state)
  //存储到localStorage
  localStorage.setItem( STATE_KEY, data )
}

export function getInitialState( ){
  //从localStorage取出数据
  var stateString = localStorage.getItem( STATE_KEY )
  
  if( !stateString ) {
    return fromJS({
      rooms:[],
      messages:{},
      username: prompt("用户名")
    })

  }
  //转换json对象
  return fromJS(JSON.parse( stateString ))
}
