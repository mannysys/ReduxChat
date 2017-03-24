import { expect } from 'chai'
import { v1 } from 'uuid'
import { fromJS,Map,List } from 'immutable'

import {
  addRoom,
  removeRoom
} from '../../src/server/core'

//测试房间增、删、改、查操作
describe('rooms', () => {

 it('添加房间：addRoom', () => {
  var firstRoom = {name:'first room', id:v1(), owner:'eisneim'}
  const nextState = addRoom( undefined, firstRoom )
  const rooms = nextState.get('rooms')
  expect(rooms).to.be.ok
  expect(rooms.get(0)).to.equal(Map(firstRoom))

  const nextNextState = addRoom(nextState,{
   name:'second room',owner:'terry'
  })
  expect(nextNextState.getIn(['rooms',1,'name'])).to.equal('second room')
 })

 const mockState = fromJS({
   rooms: [{name:'first room', id:v1(), owner:'eisneim'}]
 })

 it('能被创建者删除', () => {
   const state = removeRoom( mockState, {
     id: mockState.getIn(['rooms',0,'id']),
     user: 'eisneim'
   })
   expect( state.get('rooms').size ).to.equal(0)
 })
 it('不能被其他人删除', () => {
   const state = removeRoom(mockState, {
     id: mockState.getIn(['rooms',0,'id']),
     user: 'terry'
   })
   expect( state.get('rooms').size ).to.equal(1)
 })


















})
