import {fromJS,Map} from "immutable"
import {yymmddhhmm} from "../shared/utils/dateTime"


export function setState(state){
  return {
    type: "SET_STATE",
    //检查是不是immutable js对象，如果不是就变成immutable js对象
    state: Map.isMap(state) ? state: fromJS(state)
  }
}

export function setUsername(username){
  return {
    type: "SET_USERNAME",
    username
  }
}

export function switchRoom(roomId){
  return {
    type: "SWITCH_ROOM",
    roomId,
    meta: { remote:true }
  }
}

export function newMessage({roomId,content,user,time}, isFromServer){
  return {
    type: "NEW_MESSAGE",
    meta: { remote: !isFromServer }, //isFromServer消息是不是服务端发过来的
    message: {
      roomId, content: content || "",
      user,
      time: yymmddhhmm()
    }
  }
}


// 从客户端发送到服务端去

export function addRoom( room ){
  if( !room || !room.owner) throw new Error("addRoom() room.owner is required")

  return {
    type:"ADD_ROOM", room,
    meta:{ remote:true },
  }
}

export function removeRoom( id, user ){
  return {
    type:"REMOVE_ROOM",
    payload:{ id, user },
    meta:{ remote:true },
  }
}
