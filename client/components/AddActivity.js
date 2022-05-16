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

  return (
    <>
      <div className="routine">
        {!routine.id ? (
          <>
            <button 
              type="submit" 
              onClick={() => dispatch(createRoutine(activities))} 
              // value={activity.id}
            >Create Routine</button>
          </>
        ) : (
          <>
          {routine.activities.map((activity) => {
            return (
              <div className="routine-item"  key={activity.id}>
                  <button className={`${activity.active ? "selected" : ""}`}
                    type="submit" 
                    onClick={() => dispatch(updateActivity(activity))} 
                    value={activity.id}
                  >🗸</button>
                <h2>{activity.activityName}</h2> 
              </div>
            )
          })}
          </>
        )}
      </div>
    </>
  )
}

export default AddActivity;