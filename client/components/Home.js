import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { me  } from '../store/auth'
import Three from './Three'
import UserRoutine from './UserRoutine'

/**
 * COMPONENT
 */

const Home = (state) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <div className="row-home">
        <div className="column-40">
          <UserRoutine />
        </div>
        <div className="column-60">
          <Three />
        </div>
      </div>
      
    </div>
  )
}

export default Home
