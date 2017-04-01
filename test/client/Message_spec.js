import React from "react"
import {fromJS,Map,List} from "immutable"
import { expect } from "chai"
import Message from "../../src/client/components/Message"
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils"

describe("Message",()=>{

  it("message content",()=>{
    const message = fromJS(
      {user:"eisneim",content:"some message",time:"23:33"}
    )

    const component = renderIntoDocument(
      <Message isSelf={true} message={message}/>
    )
    const $myMessage = scryRenderedDOMComponentsWithClass(component,"message-self")
    expect( $myMessage.length ).to.equal(1)
  })

})
