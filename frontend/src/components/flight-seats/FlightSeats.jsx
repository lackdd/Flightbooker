import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import "./FlightSeats.css";
import airplaneImage from "/src/assets/airplane_seat_map.png";
import PeopleSelection from "../people-selection/PeopleSelection.jsx";

function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;
    const [columns, setColumns] = useState({});
    const [filteredColumns, setFilteredColumns] = useState({});
    const [selectedPeople, setSelectedPeople] = useState("1");
    const prevSelectedPeople = useRef(selectedPeople);
    const seatsLoaded = useRef(false);


    const handlePeopleSelection = (value) => {
        setSelectedPeople(value);
    };

    useEffect(() => {
        const getFlightSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/seats/${flight.id}`);
                const listOfColumns = { A: [], B: [], C: [], D: [], E: [], F: [] };

                response.data.forEach(seat => {
                    const column = seat.seatNumber.charAt(0);
                    if (listOfColumns[column]) {
                        listOfColumns[column].push({ ...seat, hidden: false, selected: false });
                    }
                });

                setColumns(listOfColumns);
                setFilteredColumns(listOfColumns);
                seatsLoaded.current = true;

                recommendSeats(listOfColumns);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (flight?.id) {
            getFlightSeats();
        }
    }, [flight?.id]);

    useEffect(() => {
        if (seatsLoaded.current && prevSelectedPeople.current !== selectedPeople) {
            prevSelectedPeople.current = selectedPeople;
            recommendSeats(filteredColumns);
        }
    }, [selectedPeople]);


    const filterSeats = (property) => {
        const filtered = {};
        Object.keys(columns).forEach(columnKey => {
            filtered[columnKey] = columns[columnKey].map(seat => ({
                ...seat,
                hidden: !seat[property]
            }));
        });
        setFilteredColumns(filtered);
        recommendSeats(filtered);
    };


    const filterTwoFreeSeats = () => {
        const filtered = {};
        Object.keys(columns).forEach(columnKey => {
            const availableSeats = columns[columnKey].filter(seat => !seat.occupied);
            filtered[columnKey] = availableSeats.map((seat, index, array) => {
                const nextSeat = array[index + 1];
                return {
                    ...seat,
                    hidden: !nextSeat || nextSeat.occupied
                };
            });
        });
        setFilteredColumns(filtered);
        recommendSeats(filtered, true);
    };


    const resetFilters = () => {
        setFilteredColumns(columns);
        recommendSeats(columns);
    };


    const recommendSeats = (filteredData, requireAdjacent = false) => {
        let allSeats = Object.values(filteredData).flat();
        let availableSeats = allSeats.filter(seat => !seat.occupied && !seat.hidden);
        let numSeatsToRecommend = parseInt(selectedPeople, 10);

        if (availableSeats.length < numSeatsToRecommend) {
            console.log("Not enough available seats to recommend.");
            return;
        }

        let selectedSeats;
        if (requireAdjacent && numSeatsToRecommend === 2) {

            for (let i = 0; i < availableSeats.length - 1; i++) {
                if (
                    availableSeats[i].seatNumber.charAt(0) === availableSeats[i + 1].seatNumber.charAt(0) &&
                    parseInt(availableSeats[i].seatNumber.substring(1)) + 1 === parseInt(availableSeats[i + 1].seatNumber.substring(1))
                ) {
                    selectedSeats = [availableSeats[i], availableSeats[i + 1]];
                    break;
                }
            }
            if (!selectedSeats) selectedSeats = availableSeats.slice(0, numSeatsToRecommend);
        } else {

            let shuffledSeats = [...availableSeats].sort(() => 0.5 - Math.random());
            selectedSeats = shuffledSeats.slice(0, numSeatsToRecommend);
        }


        let updatedSeats = allSeats.map(seat =>
            selectedSeats.some(selected => selected.id === seat.id)
                ? { ...seat, selected: true }
                : { ...seat, selected: false }
        );


        let updatedColumns = { A: [], B: [], C: [], D: [], E: [], F: [] };
        updatedSeats.forEach(seat => {
            const column = seat.seatNumber.charAt(0);
            if (updatedColumns[column]) {
                updatedColumns[column].push(seat);
            }
        });

        setFilteredColumns(updatedColumns);
    };

    return (
        <div className="flightseat">
            <div className="airplane-background" style={{ backgroundImage: `url(${airplaneImage})` }}>
                <div className="seat-container">
                    <h1>Select Seats for Flight {flight.flightNumber}</h1>
                    <PeopleSelection selectedValue={selectedPeople} onSelect={handlePeopleSelection} />
                    <p>Selected people: {selectedPeople}</p>

                    <div className="filters">
                        <button onClick={() => filterSeats("nearWindow")}>Show Window Seats</button>
                        <button onClick={() => filterSeats("nearExit")}>Show Near Exit Seats</button>
                        <button onClick={() => filterSeats("footSpace")}>Show Seats with Foot Space</button>
                        <button
                            onClick={filterTwoFreeSeats}
                            disabled={selectedPeople !== "2"}
                            style={{
                                backgroundColor: selectedPeople === "2" ? "" : "#ccc",
                                cursor: selectedPeople === "2" ? "pointer" : "not-allowed"
                            }}
                        >
                            Seats next to each other
                        </button>
                        <button onClick={resetFilters}>Reset Filters</button>
                    </div>

                    <div className="seats-wrapper">
                        {Object.keys(filteredColumns).length === 0 && <p>Loading seats...</p>}

                        {Object.keys(filteredColumns).map((columnKey, index) => (
                            <React.Fragment key={columnKey}>
                                <div className="seat-row">
                                    {filteredColumns[columnKey]?.map(seat => (
                                        <button
                                            key={seat.id}
                                            className={`seat ${seat.occupied ? "occupied" : seat.selected ? "recommended-seat" : ""}`}
                                            style={{
                                                marginRight: "5px",
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
    );
}

export default FlightSeats;
