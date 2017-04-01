import _ from 'lodash'


const DEFAULT_ROOM = '0'

/*
  socket 
 */
export default function listenWebSocket( io, store ){

  io.on('connection', socket => {
    console.log("one client connected")

    socket.emit("state", store.getState() )

    // 将新进入的用户加入到默认的房间
    socket.join( DEFAULT_ROOM )
    
    //监听前端发送的action事件，进行处理
    socket.on('action', action => {
      console.log( 'client action：', action )

      switch( action.type ){
        case 'SWITCH_ROOM':
          return switchRoom( socket, action.roomId || DEFAULT_ROOM ) //切换房间
        
        case 'NEW_MESSAGE':  
          //先检查用户有没有房间
          if( !_.isEmpty(socket.rooms) && _.size(socket.rooms) > 0 ){
            //然后遍历拿到房间id，然后向这个房间里发送消息
            _.forEach(socket.rooms, ( id, key ) => {
              console.log('id:',id)
              socket.to( id ).emit( 'message', action.message )
            })
          }else{ 
            socket.emit( 'message', action.message )
          }
          return 

      }

      store.dispatch( action ) // 后端处理action
      socket.emit( 'state', store.getState() )

      //检查下action如果是创建房间和删除房间，就将这消息发送所有人（同步房间信息）
      if( ["ADD_ROOM","REMOVE_ROOM"].indexOf(action.type) > -1){
        socket.broadcast.emit("state", store.getState() ) // broadcast是发送消息除了自己以外，发送给所有人
      }

        
    })



    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
  })

}


function switchRoom( socket, roomId ){
  console.log('rooms：',socket.rooms)
  // socket.rooms是获取所有房间
  _.forEach(socket.rooms, ( room, index ) => {
    console.log('should leave room, skip first one')
    if( index > 0 ){
      socket.leave( room ) //退出房间，除了默认房间 ,
    }
  })

  // socket.leave这个方法是异步的，所以使用了定时器延时重新加入房间
  setTimeout( () => {
    socket.join( roomId )
    console.log( 'roomId：', roomId, 'socket.rooms：', socket.rooms )
  },200 )

}