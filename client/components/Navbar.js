import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
// import RoutineSidebar from './RoutineSideBar';

const Navbar = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = !!auth.id

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div className='container-nav'>
      <nav>
        <div className='nav-brand'>
          <NavLink className="title" to="/">wind down</NavLink>
        </div>
        {isLoggedIn ? (
            <div className='container-nav-right'>
              <NavLink className="navItem" to="/my-room">my room</NavLink>
              <NavLink className="navItem" to="/edit">edit</NavLink>
              <NavLink className="navItem" to="/#" onClick={handleClick}>logout</NavLink>
            </div>
        ) : (
          <div className='container-nav-right'>
            <NavLink className="navItem" to="/login">login</NavLink>
            <NavLink className="navItem" to="/signup">sign up</NavLink>
            <NavLink className="navItem" to="/room">view room</NavLink>
          </div>
        )}
      </nav>
    </div>
  )
} 

export default Navbar;