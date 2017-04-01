/*
 * 消息输入框
 */
import React,{ Component } from 'react'
import ReactDOM from 'react-dom'

export default class InputBox extends Component {

  handleSubmit(e){
    e.preventDefault()
    var $textarea = ReactDOM.findDOMNode( this.refs.textarea )
    if( typeof this.props.sendMessage === "function" ){
      this.props.sendMessage( $textarea.value )
      $textarea.value = ""
    }else{
      console.log("props.sendMessage not defined!!")
    }
  }
  render(){
    return (
      <div id="chat-inputbox">
        <form className="flex-row" onSubmit={ this.handleSubmit.bind(this) }>
          <div className="flex">
            <textarea ref="textarea" name="message" rows="4"></textarea>
          </div>
          <div style={{width:'130px',textAlign:'right'}}>
            <button type="submit" className="btn lg color-2">发送</button>
          </div>
        </form>
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
reactMixin.onClass( InputBox, PureRenderMixin )
