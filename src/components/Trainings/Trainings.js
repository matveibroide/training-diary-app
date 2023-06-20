import { useReducer, useState } from "react"
import Exercises from '../Exercises/Exercises'
import './Trainings.scss'


export default function Training({training,dispatch,id}) {
    
    const [active,setActive] = useState(false)

    const color = active ? 'red' : 'green'

    return (
        <div className="trainings-info">
            <div className="trainings-info-content">
                <div className="training-headers">
                    <h4>training:{training.name}</h4>
                    <h4>Date:{training.date}</h4>
                </div>
                <button className="close-button" style={{backgroundColor:`${color}`}} onClick={() => setActive(!active)}>{active ? 'Close' : 'Show'}</button>
            </div>
            {active ? <Exercises training = {training} id = {id} dispatch = {dispatch}/> : null}
        </div>
    )
}