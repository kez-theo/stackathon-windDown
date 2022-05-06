import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { me  } from '../store/auth'
import UserRoutine from './UserRoutine'
import Three from './Three'
import RoutineSidebar from './RoutineSideBar';

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
       <div className='container'>
          <button className="navItem" onClick={openSidenav}>routine</button>
       </div>
      <RoutineSidebar name={"Hello Moon!"} width={width} closeNav={closeSidenav}/>
      <Three />
    </div>
  )
}

export default Home
