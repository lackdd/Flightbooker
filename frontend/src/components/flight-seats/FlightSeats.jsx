import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import "./FlightSeats.css";
import airplaneImage from "/src/assets/airplane_seat_map.png";


function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;
    const [rows, setRows] = useState([]);
    const [freeSeats, setFreeSeats] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);


    useEffect(() => {

        const getFlightSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/seats/${flight.id}`)
                const mapOfRows = {
                    A : [],
                    B : [],
                    C : [],
                    D : [],
                    E : [],
                    F : []
                }

                for (let i = 0; i < response.data.length; i++) {
                    let row = response.data[i].seatNumber.substring(0, 1);
                    mapOfRows[row].push(response.data[i]);
                }

                setRows(mapOfRows);
                setFilteredRows(mapOfRows);

            } catch (error) {
                console.log(error.message);
            }
        };
        getFlightSeats();
    }, []);

    /*const recommendSeats = () => {
        let allSeats = Object.values(rows).flat();
        let freeSeats = allSeats.filter(seat => !seat.occupied);
        let randomNumber = Math.floor(Math.random() * freeSeats.length);


    }*/

    const filterSeats = (property) => {
        const filteredSeats = {};
        Object.keys(rows).forEach(rowKey => {
            filteredSeats[rowKey] = rows[rowKey].map(seat => ({
                ...seat,
                hidden: !seat[property]
            }));
        });
        setFilteredRows(filteredSeats);
    }

    const resetFilters = () => {
        setFilteredRows(rows);
    }


    return (
        <div className="flightseat">
            <div className="airplane-background" style={{backgroundImage: `url(${airplaneImage})`}}>
                <div className="seat-container">
                    <h1>Select Seats for Flight {flight.flightNumber}</h1>
                    <div className="filters">
                        <button onClick={() => filterSeats("nearWindow")}>Show Window seats</button>
                        <button onClick={() => filterSeats("nearExit")}>Show near Exit seats</button>
                        <button onClick={() => filterSeats("footSpace")}>Show seats with foot space</button>
                        <button onClick={() => resetFilters()}>Reset Filters</button>
                    </div>
                    <div>
                        {Object.keys(filteredRows).map((rowKey, index) => (
                            <React.Fragment key={rowKey}>
                            <div className="seat-row">
                                {filteredRows[rowKey].map(seat => (
                                <button key={seat.id} className= {`seat ${seat.occupied ? "occupied" : ""} ${seat.hidden ? "dimmed-seat" : ""}`}>
                                    {seat.seatNumber}
                                </button>
                                ))}
                            </div>
                        {index === 2 && <div className="seat-gap"> </div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightSeats;
