import {fromJS,Map,List} from "immutable"


export default function rootReducer(state=Map(), action){
  switch(action.type){
    case "SET_STATE":  //将旧对象数据和新对象合并
      return state.merge(Map(action.state))

    case "SET_USERNAME":  //修改用户名
      return state.set("username", action.username)

    case "SWITCH_ROOM": //切换房间
      return state.set("currentRoom", action.roomId)

    case "NEW_MESSAGE": //发新消息
      if(!action.message || !action.message.roomId)
        return state
      //检查这个roomId在 messages里是否存在
      if( state.get("messages").has( action.message.roomId ) ){
        //更新数据
        return state.updateIn(
          ["messages",action.message.roomId],
          array => array.push( Map(action.message) )
        )
      } else {
        return state.setIn(
          ["messages", action.message.roomId],
          List.of(Map(action.message))
        )
      }

    default:
      return state
  }

}
