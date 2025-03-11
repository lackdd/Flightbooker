import {useLocation} from "react-router-dom";


function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;



    return (
        <div>
            <h1>Select Seats for Flight {flight.id}</h1>
            <p>From: {flight.startingLocation} → To: {flight.destination}</p>
            <p>Departure: {flight.startingDateTime}</p>
            <p>Arrival: {flight.arrivalDateTime}</p>
            <p>Price: {flight.price}€</p>

            {/* TODO: Add seat selection logic here */}
            <button onClick={() => alert("Seat Selected!")}>Select Seat</button>
        </div>
    )
}

export default FlightSeats;
