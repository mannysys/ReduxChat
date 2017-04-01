/*
 * 消息内容
 */
import React,{ Component } from 'react'


export default class Message extends Component{

   render(){
     const { message, isSelf } = this.props
     const className = isSelf ? "message-self":""

     return (
       <li className={className+" clearfix"}>
         <div className="message-inner">
           <p className="chat-username">{message.get("user")}
             <small>{message.get("time")}</small>
           </p>
           <p>{message.get("content")}</p>
         </div>
       </li>
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
reactMixin.onClass( Message, PureRenderMixin )
