import React from 'react'
import { typeAssert } from './utils/typeAssert'

function App() {
  const str = (() => {
    try {
      typeAssert(
        { x: 114514 },
        {
          x: 'number'
            .chainWith(x => (x > 0 ? true : 'too small'))
            .chainWith(x => (x < 114514 ? true : 'too large'))
        }
      )
    } catch (e) {
      return e
    }
    return ''
  })()

  return (
    <div className="App">
      <code>{ str }</code>
    </div>
  )
}

export default App
