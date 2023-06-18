import {useReducer, useState,useEffect} from 'react'
import './App.scss';
import Todo from './components/Exercsice/Todo';
import DaySelector from './components/DaySelector/DaySelector';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO:'delete-todo',
  UPDATE_INTENSITY:'update-intensity',
  UPDATE_DAY:'update_day',
  UPDATE_TODOS_FROM_LOCAL_ST:'update-from-local-storage'
}

function reducer(state,action) {
  
  switch (action.type) {

    case ACTIONS.ADD_TODO:

    return {
      ...state,
      todos: [...state.todos, newTodo(action.payload.name,state)]
    };

    case ACTIONS.TOGGLE_TODO:

    return {
      ...state,
      
      todos: state.todos.map(todo=>{
        
        if (todo.id === action.payload.id) {
          return {...todo, complete:!todo.complete}
        }
          return todo
      })
    }

      case ACTIONS.DELETE_TODO:

      return {
          ...state,
          todos:state.todos.filter(todo=>todo.id!==action.payload.id)
        }


        case ACTIONS.UPDATE_INTENSITY:
          
        return {
            ...state,
              todos:state.todos.map(todo=>{
          
          if (todo.id === action.payload.id - 1) {
            console.log(todo)
            return {
              ...todo,
              intensity:{sets:action.payload.intensity.sets,reps:action.payload.intensity.reps,weight:action.payload.intensity.weight,rpe:action.payload.intensity.rpe}
              
            }
          }

          else {return {
            ...todo
          }}

          })
            
            
          }
        
        case ACTIONS.UPDATE_DAY:

        return {
          ...state,
          currentDay:action.payload.day
        }

        case ACTIONS.UPDATE_TODOS_FROM_LOCAL_ST:
        console.log(action.payload.exercises)
        return {
          ...state,
          todos:action.payload.data
        }

        default:
          return state

          
  }
  

}

function newTodo(name,state) {
  
  return {id:Date.now(), 
    name:name, 
    complete:false,
    day:state.currentDay,
    intensity:null
    
}}



function App() {

  

  useEffect(()=>{
    const savedExercises = localStorage.getItem('exercises')
    if (savedExercises) {
      dispatch({type:'update-from-local-storage',payload:{data:JSON.parse(savedExercises)}})
    }
  },[])


  console.log(JSON.parse(localStorage.getItem('exercises')))

  const initialState = {
    todos:localStorage.getItem('exercises') ? JSON.parse(localStorage.getItem('exercises')): [],
    intensity:[],
    currentDay:'Monday'
  }

 




  const [name, setName] = useState('');

  const [state,dispatch] = useReducer(reducer,initialState)

  
  
  
  
  useEffect(() => {
    console.log('recorder')
    console.log(state.todos)
    localStorage.setItem('exercises',JSON.stringify(state.todos));
  }, [state.todos]);

 

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({type:ACTIONS.ADD_TODO, payload:{name:name}})
    setName('')
  }

 
  

  return (
    <div className="App">
      <DaySelector dispatch = {dispatch}/>
    <div className="add-exercise">
      <form onSubmit={handleSubmit} action="">
        <input type="text" value = {name} onChange = {e => setName(e.target.value) }  />
        <button>add exercise</button>
      </form>
      {state.todos.map(todo=>{
        
        if (todo.day === state.currentDay) {
          return <Todo  
          key = {todo.id} 
          todo = {todo} 
          dispatch={dispatch} 
          exercises = {state.todos}
          day = {state.currentDay}
          
          />
        }
      
      })}
    </div>
    </div>
  );
}

export default App;
