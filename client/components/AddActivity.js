import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createRoutine, updateActivity, fetchRoutine } from "../store/routine";
import axios from "axios";

const AddActivity = () => {

  const dispatch = useDispatch()
  const [activities, setActivities] = useState([])
  const routine = useSelector((state) => state.routineReducer)

  useEffect(() => {
    const fetchActivities = async () => {
      const { data: activities } = await axios.get("/api/activities")
      setActivities(activities)
    };
  fetchActivities()
  dispatch(fetchRoutine())
  }, [])

  console.log(routine)

  return (
    <>
      <div className="routine">
        {!routine.length ? (
          <>
            <button 
              type="submit" 
              onClick={() => dispatch(createRoutine(activities))} 
              // value={activity.id}
            >Create Routine</button>
          </>
        ) : (
          <>
            {routine.length === 0 ? (
              <h2>Loading...</h2>
            ) : (
              <>
              {routine.map((activity) => {
                return (
                  <div className="routine-item"  key={activity.activityId}>
                      <button className={`${activity.active ? "selected" : ""}`}
                        type="submit" 
                        onClick={() => dispatch(updateActivity(activity))} 
                        value={activity.activityId}
                      >🗸</button>
                    <h2>{activity.activityName}</h2> 
                  </div>
                )
              })}
            </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default AddActivity;