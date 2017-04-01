/*
 * 房间列表
 */
import React,{ Component } from 'react'

export default class RoomList extends Component {

  isActive( room, currentRoom ){
    return room.get('id') === currentRoom
  }

  render(){
    const {rooms, currentRoom} = this.props

    return (
      <div className="chat-room-list">
      {
        rooms.map((room,index) => {
          return(
            <a className={this.isActive(room,currentRoom)?'active':''}
              onClick={ e => this.props.switchRoom(room.get('id')) }
              key={index} href='#'>
              {room.get('name')}
            </a>
          )
        })
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
reactMixin.onClass( RoomList, PureRenderMixin )
