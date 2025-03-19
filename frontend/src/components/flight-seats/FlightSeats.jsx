import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import "./FlightSeats.css";
import airplaneImage from "/src/assets/airplane_seat_map.png";


function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;
    const [columns, setColumns] = useState([]);


    useEffect(() => {

        const getFlightSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/seats/${flight.id}`)
                const listOfColumns = {
                    A: [],
                    B: [],
                    C: [],
                    D: [],
                    E: [],
                    F: []
                };

                response.data.forEach(seat => {
                    const column = seat.seatNumber.charAt(0);
                    if (listOfColumns[column]) {
                        listOfColumns[column].push(seat);
                    }
                });

                setColumns(listOfColumns);
            } catch (error) {
                console.log(error.message);
            }
        };
        getFlightSeats();
    }, []);

    /*const handleButtonClick() {

    }*/


    return (
        <div className="flightseat">
            <div className="airplane-background" style={{backgroundImage: `url(${airplaneImage})`}}>
                <div className="seat-container">
                    <h1>Select Seats for Flight {flight.flightNumber}</h1>
                    <div className="filters">
                        <button onClick={() => handleButtonClick()}>
                            Next to Window
                        </button>
                    </div>

                    <div className="seats-wrapper">
                        {Object.keys(columns).length === 0 && <p>Loading seats...</p>}

                        {Object.keys(columns).map((columnKey, index) => (
                            <React.Fragment key={columnKey}>
                                <div className="seat-row">
                                    {columns[columnKey]?.map(seat => (
                                        <button
                                            key={seat.id}
                                            className={seat.occupied ? "occupied" : "seat"}
                                            style={{marginRight: "5px"}}
                                        >
                                            {seat.seatNumber}
                                        </button>
                                    ))}
                                </div>
                                {index === 2 && <div className="seat-gap"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightSeats;



