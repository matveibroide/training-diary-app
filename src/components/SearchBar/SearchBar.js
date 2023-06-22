import { useState } from "react"
import Training from "../Trainings/Trainings";
import './SearchBar.scss'



export default function SearchBar({trainings,dispatch}) {

const [searchInput,setSearchInput] = useState('')



    return (
        <div className="searchbar">
            <div>Find your training:</div>
            <input placeholder="Enter day,date or training name" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type="text" />
        <div>
    {
    searchInput !== '' ?

    trainings

    .filter(
        (item) =>
        item.date.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.day.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((element, index) => {
        return (
        <div className="App-row" key={index}>
            <Training dispatch={dispatch} training={element} />
        </div>
        );
    })

    : 
    null

    }
</div>
        </div>
    )
}