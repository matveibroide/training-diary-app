import {useReducer, useState,useEffect} from 'react'
import { ACTIONS } from '../../App';
import Exercise from '../Exercsice/Exercise';


/* export const ACTIONS = {
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


} */




export default function Exercsices({dispatch,id,training}) {

const [name, setName] = useState('');
const [exerciseID,setId] = useState(id)

function handleSubmit(e) {
    console.log('true')
e.preventDefault(e)
dispatch({type:ACTIONS.UPDATE_EXERCISE, payload:{name:name,id:exerciseID}})
setName('')
}

return (

<div className="add-exercise">
    <form onSubmit={handleSubmit} action="">
    <input placeholder='Exercise name' type="text" value = {name} onChange = {e => setName(e.target.value) }  />
    <button style={{backgroundColor:'green'}} >Add exercise</button>
    </form>
   {training.exercises.map((item,key)=>{
    return <div key={key}>
        
        <Exercise dispatch={dispatch} exercise = {item}/>
    </div>
   })}
</div>

);
}

