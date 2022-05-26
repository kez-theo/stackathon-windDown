import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutine, updateDuration } from "../store/routine";
import AddActivity from './AddActivity';

const EditRoutine = () => {

  const dispatch = useDispatch()
  const routine = useSelector((state) => state.routineReducer)
  const [values, setValues] = useState({
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchRoutine())
  }, [])

  const handleChange = (evt) => {
    evt.persist();
    setValues((values) => ({ 
      ...values,
      duration: evt.target.value }))
  };

  const handleSubmit = (evt) => {
    evt.persist();
    setValues((values) => ({ 
      ...values,
      duration: evt.target.value }))
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
                <h2>Add Activities to Create your Routine</h2>
              </div>
            ) : (
              <div>
                <table className='room'>
                  <tbody>
                    {routine.map((activity) => (
                      <tr key={activity.id}>
                        {activity.active && (
                          <>
                            <td>{activity.activityName}</td>
                            <td>
                              <input 
                                id={activity.id}
                                name="duration" 
                                type="text"
                                placeholder={activity.duration} 
                                value={values.duration}
                                onChange={handleChange} 
                              />
                            </td>
                            <td>
                              <button 
                              type="submit"
                              onClick={() => dispatch(updateDuration(activity))}
                              >Edit</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
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