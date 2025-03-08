import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {

    const [flights, setFlights] = useState([]);

    useEffect (() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/flights")
                setFlights(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchFlights();
    }, [])

  return (
    <>
        <h1>Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>

        <p>Palun sisestage Lennujaam, kust lennata tahate.</p>
        {
        flights.map(f => <p key={f.id}>{f.name}</p>
        )}
    </>
  )
}

export default App
