import {useReducer, useState,useEffect} from 'react'
import './App.scss';
import DaySelector from './components/DaySelector/DaySelector'
import Training from './components/Trainings/Trainings';
import SearchBar from './components/SearchBar/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { faBars, faCoffee, faDumbbell, faScroll, faXmark } from '@fortawesome/free-solid-svg-icons'

const dumbbell = <FontAwesomeIcon size = '3x' icon={faDumbbell} />

 export const ACTIONS = {
  ADD_TRAINING:'add-training',
  DELETE_TRAINING:'delete-training',
  UPDATE_DAY:'update-day',
  UPDATE_EXERCISE:'update-exercise',
  UPDATE_EXERCISE_INTENSITY:'update-exercise-intensity',
  DELETE_EXERCISE: 'delete-exercise'
}

function reducer(state,action) {
  switch(action.type) {
      case ACTIONS.ADD_TRAINING:
          
          return {
              ...state,
              trainings:[...state.trainings,newTraining(action.payload.name,action.payload.date,state)]
          }
      case ACTIONS.UPDATE_DAY:
        
        return {
          ...state,
          day:action.payload.day
        }
      
      case ACTIONS.UPDATE_EXERCISE:
        return {
          ...state,
          trainings:[...state.trainings.map(item=>{
            if (item.id === action.payload.id) {
              return {
                ...item,
                  exercises:[...item.exercises,newExercise(action.payload.name,action.payload.id)],
                  intensity:[]
                }  
            }

            else {
              return item
                
              
            }

          })]
        }


      case ACTIONS.UPDATE_EXERCISE_INTENSITY: 
          

        return {
          ...state,
          trainings: state.trainings.map((training) => {
            return {
              ...training,
              exercises: training.exercises.map((exercise) => {
                if (exercise.activeID === action.payload.id) {
                  console.log(exercise);
                  return {
                    ...exercise,
                    intensity: {
                    reps:action.payload.intensity.reps,
                    sets:action.payload.intensity.sets,
                    weight:action.payload.intensity.weight,
                    rpe:action.payload.intensity.rpe,
                    tut:action.payload.intensity.tut}
                  };
                } else {
                  return exercise;
                }
              }),
            };
          }),
        };
          
          
      case ACTIONS.DELETE_EXERCISE:
        console.log('work')
        return {
          ...state,
          trainings:state.trainings.map((training)=>{
            
            return {
              ...training,
              exercises:training.exercises.filter(exercise=>exercise.activeID !== action.payload.id)
            }


          })
        }

      case ACTIONS.DELETE_TRAINING:
        
      return {
        ...state,
        trainings:state.trainings.filter(training=>training.id !== action.payload.id)
      }

          default:
  }


}

function newTraining(name,date,state) {

  
  return {
      name:name,
      date:date,
      day:state.day,
      exercises:[],
      id:Date.now()
  }
}

function newExercise(name,id) {
  return {
    name:name,
    intensity:[],
    id:id,
    activeID:Date.now()
  }
}

export default function App() {

  
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [valid,setValid] = useState(true)
  
  
  const savedTrainings = localStorage.getItem('trainings')
  // DAY NULL IF DAY NULL CONTENT = NULL : SOMETHING
  //user opens menu chose day we show him add tab
  const initialState = {
    trainings:savedTrainings ? JSON.parse(savedTrainings) : [],
    day:null
    
}
const [state,dispatch] = useReducer(reducer,initialState)


useEffect(()=>{
  localStorage.setItem('trainings',JSON.stringify(state.trainings))
},[state.trainings])

function handleSubmit(e) {

    if (name === ''|| date === '') {
      e.preventDefault()
      setValid(false)
      return
    }

    if (name !== '' && date !== '') {
      e.preventDefault()
      setValid(true)
      e.preventDefault()
      dispatch({type:ACTIONS.ADD_TRAINING,payload:{name:name,date:date}})
      setName('')
      setDate('')
      
    }

   
    
  }

  

  const inputColor = valid ? '' : 'red'
  
  

  return (
    <div className='App'>
      
    <DaySelector dispatch={dispatch}/>
    {state.day ? null : 
    (<div className='dumbbell'>
    {dumbbell}
    <p>
      Please open menu select day and enter your training
    </p>
  </div>)}
    {state.day ? (
    <ErrorBoundary>
      <SearchBar dispatch={dispatch} trainings={state.trainings} />
    </ErrorBoundary>
  ) : null}
    <div className="add-exercise">
        {state.day ? 
        (<div className="add-exercise-form">
        <form onSubmit={handleSubmit} action="">
            <span style={{backgroundColor:`${inputColor}`,borderRadius:'5px',padding:'0.5em'}}>{valid ? null : 'Enter training name and date'}</span>
            <input  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Training name" type="text" />
            <input  value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Date" type="date" />
            <button>ADD TRAINING</button>
        </form>
      </div>)
      : null}
      
        {
              state.trainings.map(training=>{
                if (training.day === state.day) {
                  console.log('render')
                  return <Training id = {training.id} dispatch = {dispatch} training = {training} key = {training.id}/>
                }
              })
      
            }
    </div>
      
      </div>
  )
}