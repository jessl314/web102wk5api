import { useState } from 'react'

import './App.css'
import RoverContainer from './components/RoverContainer'
import BanList from './components/BanList'
import History from './components/History'



function App() {





  return (
    <>
    <div className="app-layout">
      <History/>
      <RoverContainer/>
      <BanList/>
    </div>
      
    </>
  )
}

export default App
