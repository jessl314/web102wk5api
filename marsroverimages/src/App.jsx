import { useState } from 'react'

import './App.css'
import RoverContainer from './components/RoverContainer'
import BanList from './components/BanList'
import History from './components/History'



function App() {
  const [bannedattrs, setBannedAttrs] = useState([]);
  const [history, setHistory] = useState([]);

  const handleBanAdd = (attr) => {
        setBannedAttrs((prev) => {
            // checks if any item in previous state of bannedattrs matches the current attribute that was clicked
            const alreadyBanned = prev.some(
            (b) => b.label === attr.label && b.value === attr.value
            );
            // if it is then just return the previous array, else append the new banned attribute
            return alreadyBanned ? prev : [...prev, attr];
        })
    }
    const handleBanRemove = (attr) => {
        setBannedAttrs((prev) =>
            prev.filter((b) => !(b.label === attr.label && b.value === attr.value))
        );
    };


  return (
    <>
    <div className="app-layout">
      <History history={history}/>
      <RoverContainer 
        bannedAttributes={bannedattrs}
        onBan={handleBanAdd}
        history={history}
        setHistory={setHistory}
      />
      <BanList
        bannedAttributes={bannedattrs}
        onBan={handleBanRemove}
      />
    </div>
      
    </>
  )
}

export default App
