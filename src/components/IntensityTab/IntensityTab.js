
import './Intensity-tab.scss'


export default function IntensityTab({todo}) {

    const reps = todo.intensity === null ? null : todo.intensity.reps
    const sets = todo.intensity === null ? null : todo.intensity.sets
    const weight = todo.intensity === null ? null : todo.intensity.weight
    const rpe = todo.intensity === null ? null : todo.intensity.rpe

    const color = rpe <= 5 ? 'green' : (rpe >= 5 && rpe <= 8) ? 'orange' : 'red';
    
    

    

    return (
        
            <div style={{backgroundColor:`${color}`}} className="intensity-tab-numbers">
            <div>Reps:{reps}</div>
            <div>Sets:{sets}</div>
            <div>Weight:{weight}</div>
            <div>RPE:{rpe}   </div>         
            </div>

    )
}