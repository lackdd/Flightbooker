import {useEffect, useState} from "react";
import axios from "axios";


function FlightSchedule() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/flights")
                setFlights(response.data);
                //console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchFlights();
    }, [])



    return (
        <>
            <h1>Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>
            {
                flights.map(f => <p key={f.id}>{[
                        f.flightNumber,
                        f.startingLocation,
                        f.startingLocationCity,
                        f.startingLocationCountry,
                        f.startingLocationIATA,
                        f.destination,
                        f.destinationCity,
                        f.destinationCountry,
                        f.destinationIATA,
                        f.startingDateTime,
                        f.arrivalDateTime,
                        f.price
                    ].join(" | ")}</p>
                )}
        </>
    );
}

export default FlightSchedule;
