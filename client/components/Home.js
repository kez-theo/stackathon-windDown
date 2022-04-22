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
    // <div className='row'> 
    //   <div className='column-40'>
    //     <h2>good evening, {auth.username}!</h2>
    //     <h2>your bedtime is {auth.bedtime}</h2>
    //     <UserRoutine />
    //   </div>
    //   <div className='column-60'>
    //     <Three />
    //   </div>
    // </div>
  )
}

export default Home
