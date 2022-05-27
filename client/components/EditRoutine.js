import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutine, updateDuration } from "../store/routine";
import AddActivity from './AddActivity';

const EditRoutine = () => {

  const dispatch = useDispatch()
  const routine = useSelector((state) => state.routineReducer)
  
  const [duration, setDuration] = useState('');

  useEffect(() => {
    dispatch(fetchRoutine())
  }, [])

  const handleChange = (evt) => {
    setDuration(evt.target.value)
  };

  const handleSubmit = (evt, activity) => {
    evt.preventDefault();
    dispatch(updateDuration({...activity, duration}))
  };

  return (
    <>
      <div  className="container">
        <div className='row'>
          <div className='column'>
            <AddActivity />
          </div>
          <div className='column'>
            {!routine || routine.length === 0  ? (
              <div>
              </div>
            ) : (
              <div>
                <table className='room'>
                  <tbody>
                    {routine.map((activity) => 
                      <tr key={activity.id}>
                        {activity.active && (
                          <>
                            <td>{activity.activityName}</td>
                            <td>
                              <input 
                                id={activity.id}
                                name="duration" 
                                type="integer"
                                placeholder={activity.duration} 
                                value={duration.duration}
                                onChange={handleChange} 
                              />
                            </td>
                            <td>
                              <button 
                              type="submit"
                              onClick={(evt) => handleSubmit(evt, activity)}
                              >Edit</button>
                            </td>
                          </>
                        )}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRoutine;