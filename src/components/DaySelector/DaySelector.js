import { useState } from 'react'
import './DaySelector.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee, faScroll, faXmark } from '@fortawesome/free-solid-svg-icons'


const bars = <FontAwesomeIcon icon={faBars} />
const xmark = <FontAwesomeIcon icon={faXmark} />

export default function DaySelector({dispatch}) {

    const [days,setDays] = useState(
    [{"day": "Monday", "active": false},
    {"day": "Tuesday", "active":false},
    {"day": "Wednesday", "active":false},
    {"day": "Thursday", "active":false},
    {"day": "Friday", "active":false},
    {"day": "Saturday", "active":false},
    {"day": "Sunday", "active":false}])
    
    const [active,setActive] = useState(false)

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
    

    const content = active ? (
        <>
        {days.map((day,i)=>{
            return (
                <div  className = {day.active ? 'day-active' : 'day'} onClick={(e) => onSelectDay(e)}  key={i}>
                    {day.day}
                </div>
            )
            })}

        </>
    ) :

    <div onClick={() => setActive(true)} className='barsMenu'>
        {bars}
    </div>
    
return (
    <div style={{width:`${active ? '50%' : ''}`,margin:`${active ? ' 0 50% 0 0' : ''}`}} className="days">
        <div onClick={() => setActive(false)} style={{position:'absolute',transform:'translate(1500%'}}>{active ? xmark : null}</div>
        {content}
    </div>
)
}