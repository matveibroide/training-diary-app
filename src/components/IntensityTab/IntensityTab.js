
import './Intensity-tab.scss'


export default function IntensityTab({exercise}) {
    
    const reps = exercise.intensity === null ? null : exercise.intensity.reps
    const sets = exercise.intensity === null ? null : exercise.intensity.sets
    const weight = exercise.intensity === null ? null : exercise.intensity.weight
    const rpe = exercise.intensity === null ? null : exercise.intensity.rpe

    const color = rpe <= 5 ? 'green' : (rpe >= 5 && rpe <= 8) ? 'orange' : 'red';
    
    

    

    return (
        
            <div style={{backgroundColor:`${color}`}} className="intensity-tab-numbers">
            <div>Reps:{reps}</div>
            <div>Sets:{sets}</div>
            <div>Weight:{weight}</div>
            <div>RPE:{rpe} </div>         
            </div>

    )
}