import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { me  } from '../store/auth'
import Three from './Three'

/**
 * COMPONENT
 */

const Home = (state) => {
  const dispatch = useDispatch()
  const [width, setWid] = useState("0%");

  useEffect(() => {
    dispatch(me());
  }, []);

  const openSidenav = ( ) => {
    setWid("30%")
  }

  const closeSidenav = ( ) => {
    setWid("0%")
  }

  return (
    <div>
       {/* <div className='container'>
          <button className="navItem" onClick={openSidenav}>routine</button>
       </div>
      <RoutineSidebar name={"Good Evening!"} width={width} closeNav={closeSidenav}/> */}
      <Three />
    </div>
  )
}

export default Home
