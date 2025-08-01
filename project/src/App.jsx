import { useState, useEffect } from 'react'
import Monetization from './components/monetization/Monetization'
import TugOfWarApp from './components/TugOfWarApp'

function App() {

  return (
    <Monetization>
      <TugOfWarApp />
    </Monetization>
  )
}

export default App