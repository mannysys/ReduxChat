/*
中间件
*/

//通过websocket发送前端的 action
export const socketMiddleware = socket => store => next => action => {
  //检查是否有remote参数，如果是true的话发送到后端 action
  if( action.meta && action.meta.remote ){
    socket.emit('action', action);
  }

  return next( action ) //跳过该中间件
}





/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)

  let result = next(action)
  const nextState = store.getState()
  console.log('next state', nextState.toJS ? nextState.toJS() : nextState )
  console.groupEnd(action.type)
  return result

}
