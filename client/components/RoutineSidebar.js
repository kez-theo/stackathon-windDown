import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { createActivity, deleteActivity, fetchRoutine } from "../store/routine";
// import { fetchActivities } from "../store/activities";
import AddActivity from './AddActivity';

const RoutineSidebar = (props) => {
  
  const dispatch = useDispatch()

  const routine = useSelector((state) => state.routineReducer)

  // useEffect(() => {
  //   dispatch(fetchRoutine());
  // }, []);

  return (
    <div className='sidenav' style={{ width: props.width, paddingTop: "20px" }} >
      <div className='container-right'>
        <button onClick={props.closeNav}>✖</button>
      </div>
      <h1>{props.name}</h1>
      <div>
        <h2>Add activities to create your routine!</h2>
      </div>
      <AddActivity />
       {/* <div className="container-sidenav">
           {routine.length < 1 ? (
          <div>
            <h2>Go back to create your routine!</h2>
          </div>
          ) : (
          <div>
             <table>
               {routine.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.activityName}</td>
                  <td>{activity.duration} min</td>
                  <td>
                    <button 
                      onClick={dispatch(deleteActivity(activity.id))}>
                      X
                    </button>
                  </td>       
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>  */}
    </div>
  )
}

export default RoutineSidebar;