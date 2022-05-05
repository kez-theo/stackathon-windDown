import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { me  } from '../store/auth'
import UserRoutine from './UserRoutine'
import Three from './Three'

/**
 * COMPONENT
 */

const Home = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Three />
    </div>
  )
}

export default Home
