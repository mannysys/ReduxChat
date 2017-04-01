import { fromJS } from 'immutable'
import { expect } from 'chai'

import { addRoom } from '../../src/server/actionCreator'
import { makeStore } from '../../src/server/store'

describe('server store', () => {

  // done是异步操作
  it('dispatch actions', ( done ) => {
    const mockState = fromJS({
      rooms:[]
    })
    const store = makeStore(mockState)

    //监听到store是否发生变化
    store.subscribe(() => {
      const state = store.getState()
      expect(state.get('rooms').size).to.equal(1)
      done()
    })

    //发送一个动作
    store.dispatch( addRoom({name: '聊天室',owner: 'terry'}) )

  })





})
