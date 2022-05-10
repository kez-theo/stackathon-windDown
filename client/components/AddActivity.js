import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addActivity, removeActivity, fetchRoutine } from "../store/routine";
import axios from "axios";

const AddActivity = () => {

  const dispatch = useDispatch()
  const [isChecked, setChecked] = useState(false)
  const [activities, setActivities] = useState([])

  // const routine = useSelector((state) => state.routineReducer)
  const routine = useSelector((state) => state.routineReducer)
  
  // const handleChange = (evt) => {
  //   setTask({
  //     [evt.target.name]: evt.target.value
  //   })
  // }

  useEffect(() => {
    const fetchActivities = async () => {
      const { data: activities } = await axios.get("/api/activities")
      setActivities(activities)
    };
  fetchActivities()
  }, [])

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

  const handleClick = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value)
    dispatch(addActivity({
      [evt.target.name]: evt.target.value
    }))
  }

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   console.log(evt.target.value)
  //   dispatch(createActivity(task))
  // }
  // onClick={(evt) => handleClick(evt, activity)}

  return (
    <>
      <div className="routine">
        {activities.map((activity) => {
          return (
            <div className="routine-item"  key={activity.id}>
                <button type="submit" onClick={() => dispatch(addActivity(activity))}>🗸</button>
              <h1>{activity.activityName}</h1> 
            </div>
          )
        })}
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