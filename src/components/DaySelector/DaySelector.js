import { useState } from 'react'
import './DaySelector.scss'

export default function DaySelector({dispatch}) {

    const [days,setDays] = useState(
    [{"day": "Monday", "active": false},
    {"day": "Tuesday", "active":false},
    {"day": "Wednesday", "active":false},
    {"day": "Thursday", "active":false},
    {"day": "Friday", "active":false},
    {"day": "Saturday", "active":false},
    {"day": "Sunday", "active":false}])


function onSelectDay(e) {

    e.preventDefault()

    const updatedDays = days.map(day=>{

        if (day.day === e.target.textContent) {
            dispatch({type:'update-day',payload:{day:e.target.textContent}})
            return {...day, active:true}
        }
        else {
            return {...day,active:false}
        }   
    })
    setDays(updatedDays)
    }
    
    
return (
    <div className="days">

        {days.map((day,i)=>{
        return (
            <div className = {day.active ? 'day-active' : 'day'} onClick={(e) => onSelectDay(e)}  key={i}>
                {day.day}
            </div>
        )
        })} 
    </div>
)
}