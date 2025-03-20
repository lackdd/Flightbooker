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
    const [originalColumns, setOriginalColumns] = useState({});


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
                        listOfColumns[column].push({...seat, hidden: false});
                    }
                });

                setOriginalColumns(listOfColumns);
                setColumns(listOfColumns);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (flight?.id) {
            getFlightSeats();
        }
    }, [flight?.id]);

    const filterSeats = (property) => {
        const filteredColumns = {...columns};
        Object.keys(filteredColumns).forEach(columnKey => {
            filteredColumns[columnKey] = filteredColumns[columnKey].map(seat => ({
                ...seat,
                hidden: !seat[property]
            }));
        });
        setColumns(filteredColumns);
    };
    // a
    const resetFilters = () => {
        const filteredColumns = {...columns};

        Object.keys(filteredColumns).forEach(columnKey => {
            filteredColumns[columnKey] = filteredColumns[columnKey].map(seat => ({
                ...seat,
                hidden: false
            }));
        });

        setColumns(filteredColumns);
    };


    return (
        <div className="flightseat">
            <div className="airplane-background" style={{backgroundImage: `url(${airplaneImage})`}}>
                <div className="seat-container">
                    <h1>Select Seats for Flight {flight.flightNumber}</h1>
                    <div className="filters">
                        <button onClick={() => filterSeats('nearWindow')}>
                            Show Window Seats
                        </button>
                        <button onClick={() => filterSeats('nearExit')}>
                            Show Near Exit Seats
                        </button>
                        <button onClick={() => filterSeats('footSpace')}>
                            Show Seats with Foot Space
                        </button>
                        <button onClick={() => filterSeats('freeSeatNextToIt')}>
                            Show Two Free Seats
                        </button>
                        <button onClick={resetFilters}>
                            Reset Filters
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
                                            style={{marginRight: "5px",
                                            visibility: seat.hidden ? "hidden" : "visible"
                                            }}
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



