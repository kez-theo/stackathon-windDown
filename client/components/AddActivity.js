import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createRoutine, addActivity, removeActivity, fetchRoutine } from "../store/routine";
import axios from "axios";

const AddActivity = () => {

  const dispatch = useDispatch()
  const [isChecked, setChecked] = useState(false)
  const [activities, setActivities] = useState([])

  // const routine = useSelector((state) => state.routineReducer)
  const routine = useSelector((state) => state.routineReducer)

  useEffect(() => {
    const fetchActivities = async () => {
      const { data: activities } = await axios.get("/api/activities")
      setActivities(activities)
    };
  fetchActivities()
  dispatch(fetchRoutine())
  }, [])

  console.log("component - routine", routine)
  console.log("component - routine.activities", routine)
  console.log("component - activities", activities)

  // const routineHash = (routine) => {
  //   const routineTable = {}
  //   if (!routine || routine.length === 0) return
  //   for (let i = 0; i < routine.length; i++) {
  //     const activity = routine[i];
  //     routineTable[activity.id] = routineTable[activity]
  //   }
  //   return routineTable;
  // }

  // const userRoutine = routineHash(routine)  


  // const handleClick = (evt, activity) => {
  //   evt.preventDefault();
  //   if (!isChecked) {
  //     dispatch(addActivity(activity))
  //     setChecked(true)
  //     console.log("check add", isChecked)
  //   } else {
  //     dispatch(removeActivity(activity.id))
  //     setChecked(false)
  //     console.log("check delete", isChecked)
  //   }
  // }


  return (
    <>
      <div className="routine">
        {!routine.activities ? (
          <>
            <button 
              type="button" 
              onClick={() => dispatch(createRoutine(activities))} 
              // value={activity.id}
            >Create Routine</button>
          </>
        ) : (
          <>
          {routine.activities.map((activity) => {
            return (
              <div className="routine-item"  key={activity.id}>
                  <button 
                    type="submit" 
                    onChange={() => dispatch(addActivity(activity))} 
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

//>>>>>>>>>>************************************

// class AddActivity extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       activityName: "",
//       duration: ""
//     };
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange(evt) {
//     this.setState({
//       [evt.target.name]: evt.target.value
//     });
//   }

//   handleSubmit(evt) {
//     evt.preventDefault();
//     this.props.createActivity({ ...this.state })
//   }

//   render() {
//     const { activityName, duration } = this.state;
//     const { handleSubmit, handleChange } = this;

//     return (
//       <>
//         <div>
//           <form  className="routine" name="add-activity" onSubmit={handleSubmit}>
//             <div>
//               <input placeholder="Enter Activity" type="text" name="activityName" onChange={handleChange} value={activityName} />
//             </div>
//             <div>
//               <input placeholder="Enter Time" name="duration" type="text" onChange={handleChange} value={duration} />
//             </div>
//             <div className="container">
//               <button type="submit">Add</button>
//             </div>
//             {/* {error && error.response && <h4 style={{display: 'flex', justifyContent: 'center'}}> {error.response.data} </h4>} */}
//           </form>
//         </div>
//       </>
//     )
//   }
// }

// const mapState = (state) => ({
//   routine: state.routineReducer
// });

// const mapDispatch = (dispatch) => ({
//   createActivity: (activity) => dispatch(createActivity(activity)),
// });

// export default withRouter(connect(mapState, mapDispatch)(AddActivity));