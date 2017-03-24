import { expect } from 'chai'
import { fromJS,Map,List } from 'immutable'
import { v1 } from 'uuid'

import coreReducer from '../../src/server/reducer'

describe('server端核心Reducer', () => {

 it('可以当做一个reducer', () => {
   var id = v1()
   var actions = [
     {type:"ADD_ROOM",room:{id,name:"1",owner:"eisneim"}},
     {type:"ADD_ROOM",room:{name:"2",owner:"terry"}},
     {type:"ADD_ROOM",room:{name:"3",owner:"eisneim"}},
     {type:"REMOVE_ROOM",payload:{id:id,user:"eisneim"}}
   ]
   // 调用数组方法reduce遍历元素，第1个参数是回调函数
   // 第2个参数是回调函数coreReducer中的第一个参数的初始值
   const finalState = actions.reduce( coreReducer, undefined )
   //检查最新房间数据是不是2个
   expect(finalState.get("rooms").size).to.equal(2)
   expect(finalState.getIn(["rooms",0,"owner"])).to.equal("terry")
 })


})
