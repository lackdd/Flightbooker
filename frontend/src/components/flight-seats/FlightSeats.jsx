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
    const [rows, setRows] = useState({});
    const [filteredRows, setFilteredRows] = useState({});
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
                const listOfRows = { A: [], B: [], C: [], D: [], E: [], F: [] };

                response.data.forEach(seat => {
                    const row = seat.seatNumber.charAt(0);
                    if (listOfRows[row]) {
                        listOfRows[row].push({ ...seat, hidden: false, selected: false });
                    }
                });

                setRows(listOfRows);
                setFilteredRows(listOfRows);
                seatsLoaded.current = true;

                recommendSeats(listOfRows);
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
            recommendSeats(filteredRows);
        }
    }, [selectedPeople]);


    const filterSeats = (property) => {
        const filtered = {};
        Object.keys(rows).forEach(rowKey => {
            filtered[rowKey] = rows[rowKey].map(seat => ({
                ...seat,
                hidden: !seat[property]
            }));
        });
        setFilteredRows(filtered);
        recommendSeats(filtered);
    };


    const filterTwoFreeSeats = () => {
        const allowedRowPairs = [
            ["A", "B"], ["B", "C"],
            ["D", "E"], ["E", "F"]
        ];

        const filtered = {};

        // Build seatMap[column][row] = seat
        const seatMap = {};
        Object.keys(rows).forEach(rowKey => {
            rows[rowKey].forEach(seat => {
                const col = seat.seatNumber.substring(1);
                if (!seatMap[col]) seatMap[col] = {};
                seatMap[col][rowKey] = seat;
            });
        });

        // Check each seat if it's part of a valid adjacent pair
        Object.keys(rows).forEach(rowKey => {
            filtered[rowKey] = rows[rowKey].map(seat => {
                const col = seat.seatNumber.substring(1);
                const row = seat.seatNumber.charAt(0);

                const validPair = allowedRowPairs.some(([r1, r2]) => {
                    const pair = (row === r1 && seatMap[col]?.[r2]) || (row === r2 && seatMap[col]?.[r1]);
                    return pair &&
                        !seat.occupied &&
                        !seatMap[col][r1]?.occupied &&
                        !seatMap[col][r2]?.occupied;
                });

                return {
                    ...seat,
                    hidden: !validPair
                };
            });
        });

        setFilteredRows(filtered);
        recommendSeats(filtered, true);
    };




    const resetFilters = () => {
        setFilteredRows(rows);
        recommendSeats(rows);
    };


    const recommendSeats = (filteredData, requireAdjacent = false) => {
        const allowedRowPairs = [
            ["A", "B"], ["B", "C"],
            ["D", "E"], ["E", "F"]
        ];

        let allSeats = Object.values(filteredData).flat();
        let availableSeats = allSeats.filter(seat => !seat.occupied && !seat.hidden);
        let numSeatsToRecommend = parseInt(selectedPeople, 10);

        if (availableSeats.length < numSeatsToRecommend) {
            console.log("Not enough available seats to recommend.");
            return;
        }

        let selectedSeats;

        if (requireAdjacent && numSeatsToRecommend === 2) {
            const seatMap = {};
            availableSeats.forEach(seat => {
                const col = seat.seatNumber.substring(1);
                const row = seat.seatNumber.charAt(0);
                if (!seatMap[col]) seatMap[col] = {};
                seatMap[col][row] = seat;
            });

            const validPairs = [];

            Object.entries(seatMap).forEach(([col, rowsMap]) => {
                allowedRowPairs.forEach(([r1, r2]) => {
                    const seat1 = rowsMap[r1];
                    const seat2 = rowsMap[r2];
                    if (seat1 && seat2) {
                        validPairs.push([seat1, seat2]);
                    }
                });
            });

            if (validPairs.length === 0) {
                console.log("No valid adjacent pairs found.");
                return;
            }

            selectedSeats = validPairs[Math.floor(Math.random() * validPairs.length)];
        } else {
            let shuffled = [...availableSeats].sort(() => 0.5 - Math.random());
            selectedSeats = shuffled.slice(0, numSeatsToRecommend);
        }

        const updatedSeats = allSeats.map(seat =>
            selectedSeats.some(sel => sel.id === seat.id)
                ? { ...seat, selected: true }
                : { ...seat, selected: false }
        );

        const updatedRows = { A: [], B: [], C: [], D: [], E: [], F: [] };
        updatedSeats.forEach(seat => {
            const row = seat.seatNumber.charAt(0);
            updatedRows[row].push(seat);
        });

        setFilteredRows(updatedRows);
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
                            Free Seats next to each other
                        </button>
                        <button onClick={resetFilters}>Reset Filters</button>
                    </div>

                    <div className="seats-wrapper">
                        {Object.keys(filteredRows).length === 0 && <p>Loading seats...</p>}

                        {Object.keys(filteredRows).map((rowKey, index) => (
                            <React.Fragment key={rowKey}>
                                <div className="seat-row">
                                    {filteredRows[rowKey]?.map(seat => (
                                        <button
                                            key={seat.id}
                                            className={`seat 
        ${seat.occupied ? "occupied" : ""} 
        ${seat.selected ? "recommended-seat" : ""} 
        ${seat.hidden ? "dimmed-seat" : ""}`}
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
