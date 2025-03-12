import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const getFlightSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/seats/${flight.flightNumber}`)
                console.log(response.data);
                setSeats(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getFlightSeats();
    }, []);



    return (
        <div>
            <h1>Select Seats for Flight {flight.flightNumber}</h1>
            <p>From: {flight.startingLocation} → To: {flight.destination}</p>
            <p>Departure: {flight.startingDateTime}</p>
            <p>Arrival: {flight.arrivalDateTime}</p>
            <p>Price: {flight.price}€</p>
            {seats.map(seat => (
                <p key={seat.id}>{seat.seatNumber}</p>
            ))}

            {/* TODO: Add seat selection logic here */}
            <button onClick={() => alert("Seat Selected!")}>Select Seat</button>
        </div>
    )
}

export default FlightSeats;
