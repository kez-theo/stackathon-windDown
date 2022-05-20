import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutine } from "../store/routine";
import AddActivity from './AddActivity';

const EditRoutine = () => {

  const dispatch = useDispatch()
  const routine = useSelector((state) => state.routineReducer)

  useEffect(() => {
    dispatch(fetchRoutine())
  }, [])

  console.log(routine)

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
                <table>
                  <tbody>
                    {routine.map((activity) => (
                      <tr key={activity.id}>
                        {activity.active && (
                          <>
                            <td>{activity.activityName}</td>
                            <td>
                              <input placeholder="Enter Time" name="duration" type="text" value={activity.duration} />
                            </td>
                            <td>
                              <button type="submit">Edit</button>
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