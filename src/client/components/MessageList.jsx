/*
 * 消息列表
 */
 import React,{ Component, PropTypes } from "react"
 import Message from "./Message"


 export default class MessageList extends Component{

   isSelf( message ){
     return this.props.username === message.get("user")
   }
   //返回消息列表数据
   $getMessages( messages ){
     if(!messages || messages.size == 0)
       return <p>还没有信息</p>

     return messages.map((message,index)=>{
       return <Message key={index}
               isSelf={ this.isSelf(message) }
               message={ message }/>
     })
   }

   render(){
     return (
       <ul className="chat-messages">
         {
           this.$getMessages( this.props.messages )
         }
       </ul>
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
reactMixin.onClass( MessageList, PureRenderMixin )
