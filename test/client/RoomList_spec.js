import React from "react"
import ReactDOM from "react-dom"
import {fromJS,Map,List} from "immutable"
import { expect } from "chai"
import RoomList from "../../src/client/components/RoomList"
import TestUtil,{
  Simulate,
  renderIntoDocument,
  isCompositeComponentWithType,
  scryRenderedDOMComponentsWithTag,  //检查渲染后组件dom
  scryRenderedDOMComponentsWithClass, //获取渲染后组件dom
} from "react-addons-test-utils"

describe("RoomList组件",()=>{

  it("render roomlist ",()=>{
    const rooms = fromJS([
      {id:"0", name:"room",owner:"eisneim"},
      {id:"1", name:"room2",owner:"terry"},
    ])
    // renderIntoDocument是渲染RoomList组件，将测试数据传到RoomList组件里
    const component = renderIntoDocument(
      <RoomList rooms={rooms} currentRoom="1"/>
    )
    // 获取已经渲染组件dom节点 a标签的元素
    const $rooms = scryRenderedDOMComponentsWithTag(component,"a")
    expect( $rooms.length ).to.equal(2)
    // 获取渲染dom节点 class元素 active
    const $active = scryRenderedDOMComponentsWithClass(component,"active")
    expect( $active.length ).to.equal(1)
  })

  it("能够切换房间", () => {
    const rooms = fromJS([
      {id:"0", name:"room",owner:"eisneim"},
      {id:"1", name:"room2",owner:"terry"},
    ])
    var currentRoom = "0"
    //当房间组件被点击时，切换到这个房间的id
    function switchRoom(id){
      console.log("change id:", id)
      currentRoom = id
    }
    const RoomListElm = (
      <RoomList rooms={rooms}
        currentRoom={currentRoom}
        switchRoom={switchRoom} />
    )
    
    const component = renderIntoDocument(RoomListElm) //渲染组件
    const $rooms = scryRenderedDOMComponentsWithTag(component, "a") //获得a标签元素
    Simulate.click(ReactDOM.findDOMNode($rooms[1])) //Simulate模拟用户的操作点击
    expect(currentRoom).to.equal("1") //检查currentRoom是否切换到房间id上
  })


})
