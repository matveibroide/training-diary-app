import {ACTIONS} from '../../App'
import IntensityTab from '../IntensityTab/IntensityTab.js'
import './Exercise.scss'
import { useState } from 'react';



export default function Exercise ({exercise,dispatch}) {

    
    
    const [sets, setSets] = useState('');
    const [reps,setReps] = useState('');
    const [weight,setWeight] = useState('');
    const [rpe,setRpe] = useState('');
    const [tut,setTut] = useState('')
    

    function handleSubmit(e) {
        console.log('red')
        e.preventDefault(e)
        dispatch({type:'update-exercise-intensity',payload:{intensity:{sets:sets,reps:reps,weight:weight,rpe:rpe,tut:tut},id:exercise.activeID}})
        setSets('')
        setReps('')
        setWeight('')
        setRpe('')
        setTut('')
    }

    
    
    
    
    
    return (
        <div className='intensity'>   
            <div className="delete-exercise">
                <div className='exerciseName'><p>{exercise.name}</p></div>
                <button className='delete-button' onClick={()=>dispatch({type:ACTIONS.DELETE_EXERCISE,payload:{id:exercise.activeID}})}>delete</button>
                
            </div>
            <div className="intensity-tab">
                <form onSubmit={handleSubmit}  action="|">
                                <div className="inputs-intensity">
                                    <input placeholder='sets' value={sets} onChange={(e)=>setSets(e.target.value)} type="text" />
                                    <input placeholder='reps' value={reps} onChange={(e)=>setReps(e.target.value)} type="text" />
                                    <input placeholder='weight' value={weight} onChange={(e)=>setWeight(e.target.value)} type="text" />
                                    <input placeholder='RPE' value={rpe} onChange={(e)=>setRpe(e.target.value)} type="text" />
                                    <input placeholder='TUT' value={tut} onChange = {(e)=>setTut(e.target.value)} type="text"  />
                                </div>
                    <button>Add</button>
                </form>
                <IntensityTab exercise = {exercise}/>
            </div>
        </div>
    )
}