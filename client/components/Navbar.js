import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import RoutineSidebar from './RoutineSideBar';

const Navbar = () => {

  const dispatch = useDispatch();
  const [width, setWid] = useState("0%");
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = !!auth.id

  // useEffect(() => {
  //   dispatch(loadCart())
  // }, []);

  const handleClick = () => {
    dispatch(logout())
  }

  const openSidenav = () => { 
    setWid("30%")
  }

  const closeSidenav = ( ) => {
    setWid("0%")
  }


  return (
    <div className='container-nav'>
      <div >
        <h1 className='title'>wind down</h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div >
            {/* The navbar will show these links after you log in */}
            <div>
              <NavLink className="navItem" to="/my-room">my room</NavLink>
              <NavLink className="navItem" to="/edit">logout</NavLink>
              {/* <NavLink className="navItem" to="/my-room" onClick={openSidenav}>edit routine</NavLink> */}
              {/* <button className="navItem" onClick={openSidenav}>routine</button> */}
              <span className="navItem" onClick={openSidenav} >routine</span>
              {/* <span className="navItem" onClick={openSidenav} >edit time</span> */}
              <RoutineSidebar name={"Hello Moon!"} width={width} closeNav={closeSidenav}/>
              <NavLink className="navItem" to="/#" onClick={handleClick}>logout</NavLink>
            </div>
          </div>
        ) : (
          <div >
            {/* The navbar will show these links before you log in */}
            <div>
              <NavLink className="navItem" to="/login">login</NavLink>
              <NavLink className="navItem" to="/signup">sign up</NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
} 

export default Navbar;