import React from 'react'
import ThreeSky from '../client/components/ThreeSky'
import Three from './components/Three'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div className='background'>
      <div className='box'>
        <ThreeSky />
      </div>
      <div className='overlay'>
        <Navbar />
        <Routes />
      </div> 
    </div>
  )
}

export default App
