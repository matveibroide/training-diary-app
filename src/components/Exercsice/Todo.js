import {ACTIONS} from '../../App.js'
import IntensityTab from '../IntensityTab/IntensityTab.js'
import './Todo.scss'
import { useState } from 'react';



export default function Todo ({todo,dispatch}) {

    
    
    const [sets, setSets] = useState('');
    const [reps,setReps] = useState('');
    const [weight,setWeight] = useState('');
    const [rpe,setRpe] = useState('');
    const [id,setId] = useState(todo.id + 1)

    function handleSubmit(e) {
        e.preventDefault(e)
        dispatch({type:'update-intensity',payload:{intensity:{sets:sets,reps:reps,weight:weight,rpe:rpe},id:id}})
        setSets('')
        setReps('')
        setWeight('')
        setRpe('')
    }

    
    
    
    
    
    return (
        <div className='intensity'>   
            <span>{todo.name}</span>
            <button className='delete-button' onClick={()=>dispatch({type:ACTIONS.DELETE_TODO,payload:{id:todo.id}})}>delete</button>        
            
            <div className="intensity-tab">
                <form onSubmit={handleSubmit}  action="|">
                                <div className="inputs-intensity">
                                    <input placeholder='sets' value={sets} onChange={(e)=>setSets(e.target.value)} type="text" />
                                    <input placeholder='reps' value={reps} onChange={(e)=>setReps(e.target.value)} type="text" />
                                    <input placeholder='weight' value={weight} onChange={(e)=>setWeight(e.target.value)} type="text" />
                                    <input placeholder='RPE' value={rpe} onChange={(e)=>setRpe(e.target.value)} type="text" />
                                </div>
                    <button>Add</button>
                </form>
                <IntensityTab todo = {todo}/>
            </div>
        </div>
    )
}