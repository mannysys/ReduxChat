import React,{ Component } from "react"
import MessageList from "./MessageList"
import InputBox from "./InputBox"
import RoomList from "./RoomList"
import { newMessage,switchRoom,addRoom,removeRoom } from "../actionCreators"


class App extends Component {

  //获取当前房间的名字
  getCurrentRoomName(){
    if(!this.props.currentRoom ) return "无"
    // immutable中调用find方法，从immutable对象中查找
    const room = this.props.rooms.find(r=>r.get("id") === this.props.currentRoom )
    return ( room && room.get ) ? room.get("name") : room
  }
  //检查是不是房间创建者
  isOwner( ){
    if(!this.props.currentRoom || !this.props.username ) return false
    // immutable中调用find方法，从对象中查找
    const room = this.props.rooms.find(r=>r.get("id") === this.props.currentRoom )
    if(!room) return false;
    return room.get("owner") == this.props.username
  }
  //获取消息内容
  getMessages(){
    return this.props.messages ?
      this.props.messages.get(this.props.currentRoom) :  []
  }
  addRoom(){
    var name = prompt("房间名称")
    if(!name) return alert("不能没有房间名称")

    this.props.dispatch( addRoom({
      name, owner: this.props.username
    }) )
  }
  removeRoom(){
    this.props.dispatch(switchRoom( ))

    this.props.dispatch( removeRoom(
      this.props.currentRoom, 
      this.props.username
    ) )
  }
  sendMessage(message){
    this.props.dispatch( newMessage({
      roomId: this.props.currentRoom,
      user: this.props.username,
      content: message
    }) )
  }


  render(){
    const { currentRoom, rooms, username, dispatch } = this.props

    return (
      <div className="flex-row">
        <nav id="chat-nav">
          <p>聊天室列表</p>
          <RoomList rooms={ rooms }
            currentRoom={currentRoom}
            switchRoom={ id => dispatch( switchRoom(id) )}
          />
          <button className="btn color-2"
            onClick={ this.addRoom.bind(this) }> + 创建聊天室</button>
        </nav>

        {
          !currentRoom ? <h2>请选择一个聊天室</h2>:
          <section id="chat-main" className="flex">
            <header className="flex-row">
              <h3>当前聊天室：{ this.getCurrentRoomName() }</h3>
              <span className="flex"></span>
              { //删除聊天室检查是否是这个房间的拥有者
                !this.isOwner() ? "":
                <button
                  onClick={this.removeRoom.bind(this)}
                  className="btn sm color-5">X 删除该聊天室</button>
              }
            </header>
            <MessageList messages={ this.getMessages() } username={username} />
            <InputBox sendMessage={this.sendMessage.bind(this)}/>
          </section>
        }

      </div>
    )
  }

}

/*
 因为我们使用的是immutable js对象，使用PureRenderMixin 使渲染的更加的快性能提高
 PureRenderMixin作用就是在react生命周期shouldComponentUpdate方法里面去进行判断
 如果2个对象的值相等的话不渲染 ，不相等的话就重新渲染组件
*/
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(App, PureRenderMixin )


import { connect } from 'react-redux'

// mapStateToProps输入逻辑：将state映射到 UI 组件的参数（props）
function mapStateToProps ( state ){

  //作为props传递 App组件
  return {
    rooms:  state.get("rooms"),
    currentRoom: state.get("currentRoom"),
    username: state.get("username"),
    messages: state.get("messages")
  }
}

//connect  会把State和dispatch转换成props传递给子组件
export const ConnectedApp = connect( mapStateToProps )(App)


export default App

/*
所有的数据都集中在了 store中，Provider从那里把store的数据拿了过来。给它的好朋友 connect，
connect是联系，连接的意思嘛，所以它将好朋友provider的数据拿了过来，让它供那些子组件使用。

*/
