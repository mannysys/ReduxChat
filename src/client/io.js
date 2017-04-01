import IO from 'socket.io-client'

export const socket = IO('http://localhost:3000')

//监听链接断开时
socket.on('disconnect', ()=>{
  console.log('user disconnected');
});
