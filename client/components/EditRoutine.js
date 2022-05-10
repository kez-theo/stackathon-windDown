// import React from 'react'
// import { connect } from "react-redux";
// import { addActivity, removeActivity, fetchRoutine } from "../store/routine";
// import { fetchActivities } from "../store/activities";
// import AddActivity from './AddActivity';
// import { withRouter} from 'react-router'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addActivity, removeActivity, fetchRoutine } from "../store/routine";
import axios from "axios";

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
        {!routine.activities || routine.activities.length === 0  ? (
          <div>
            <h2>Add Activities to Create your Routine</h2>
          </div>
        ) : (
          <div>
            <table>
              <tbody>
                {routine.activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.activityName}</td>
                    <td>
                      <input placeholder="Enter Time" name="duration" type="text" value={activity.duration} />
                    </td>
                    <td>
                      <button type="submit">Edit Time</button>
                    </td>
                    {/* <td>
                      <button 
                        onClick={() => this.props.deleteActivity(activity.id)}>
                        ✖
                      </button>
                    </td>        */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default EditRoutine;

// class EditRoutine extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchRoutine()
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.routine.length !== this.props.routine.length) {
//       this.props.fetchActivities()
//     }
//   }

//   render() {
//     const routine = this.props.routine || [];
//     return (
//       <>
//         <div  className="container">
//           <AddActivity />
//           {routine.length < 1 ? (
//             <div>
//               <h2>Add Activities to Create your Routine</h2>
//             </div>
//           ) : (
//             <div>
//               <table>
//                 {routine.map((activity) => (
//                   <tr key={activity.id}>
//                     <td>{activity.activityName}</td>
//                     <td>{activity.duration} minutes</td>
//                     <td>
//                       <button 
//                         onClick={() => this.props.deleteActivity(activity.id)}>
//                         ✖
//                       </button>
//                     </td>       
//                   </tr>
//                 ))}
//               </table>
//             </div>
//           )}
//         </div>
//       </>
//     )
//   }
// }

// const mapState = (state) => ({
//   routine: state.routineReducer
// });

// const mapDispatch = (dispatch) => ({
//   fetchActivities: () => dispatch(fetchActivities()),
//   createActivity: (activity) => dispatch(createActivity(activity, history)),
//   deleteActivity: (activityId) => dispatch(deleteActivity(activityId, history)),
// });

// export default withRouter(connect(mapState, mapDispatch)(EditRoutine));