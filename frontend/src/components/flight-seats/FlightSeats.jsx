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
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState(1);

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
                recommendSeats(mapOfRows);

            } catch (error) {
                console.log(error.message);
            }
        };
        getFlightSeats();
    }, []);

    const filterSeats = (property) => {
        const filteredSeats = {};
        Object.keys(rows).forEach(rowKey => {
            filteredSeats[rowKey] = rows[rowKey].map(seat => ({
                ...seat,
                hidden: !seat[property]
            }));
        });
        setFilteredRows(filteredSeats);
        recommendSeats(filteredSeats);
    }

    const filterTwoFreeSeats = () => {
        const allowedRowPairs = [
            ["A", "B"], ["B", "C"], ["D", "E"], ["E", "F"]
        ];

         /*i'm making a seatMap of [col][rowKey] so every key would be a column number instead of row letter because this allows me to compare
         seats vertically instead of horizontally, A1 against B1, B1 against C1 etc*/
        const seatMap = {};
        Object.keys(rows).forEach(rowKey => {
            rows[rowKey].forEach(seat => {
                const col = seat.seatNumber.substring(1);
                if (!seatMap[col]) seatMap[col] = {}; // i need to initialize seatMap[col] but since every column has 6 row elements, i only need 1 of the six to initialize it
                seatMap[col][rowKey] = seat;
            });
        });
        const filteredSeats = {};
        Object.keys(rows).forEach(rowKey => {
            filteredSeats[rowKey] = rows[rowKey].map(seat => {
                const col = seat.seatNumber.substring(1);
                const row = seat.seatNumber.charAt(0);

                /*goes through allowedRowPairs pair by pair, so aisle seats like "C", "D" wouldnt be paired and excludes the seat if its occupied
                and checks if the other seat that it is paired with is occupied too or not*/
                const validPair = allowedRowPairs.some(([r1, r2]) => {
                    const pair = (row === r1 && seatMap[col]?.[r2]) || (row === r2 && seatMap[col]?.[r1]); // not really needed but otherwise ensures data integrity
                    return pair &&
                        !seat.occupied &&
                        !seatMap[col][r1].occupied &&
                        !seatMap[col][r2].occupied;
                });

                // seat is copied into filteredSeats[rowKey] and hidden if validPair was false
                return {
                    ...seat,
                    hidden: !validPair
                };
            });
        });

        setFilteredRows(filteredSeats);
        recommendSeats(filteredSeats, true)
    }

    const recommendSeats = (data, nextToEachOther = false) => {
        let allSeats = Object.values(data).flat();
        let freeSeats = allSeats.filter(seat => !seat.occupied && !seat.hidden);
        if(freeSeats.length === 0) {
            return;
        }

        let recommendedSeats;

        if (nextToEachOther && selectedPeople === 2) {

            // Borrow a lot of logic from FilterTwoFreeSeats function
            const allowedRowPairs = [
                ["A", "B"], ["B", "C"],
                ["D", "E"], ["E", "F"]
            ];

            const seatMap = {};
            freeSeats.forEach(seat => {
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
                console.log("No valid pairs");

                // get rid of earlier recommendations
                const clearedSeats = allSeats.map(seat => ({
                    ...seat,
                    recommended: false
                }));

                const updatedRows = {A: [], B: [], C: [], D: [], E: [], F: []};
                clearedSeats.forEach(seat => {
                    const row = seat.seatNumber.charAt(0);
                    updatedRows[row].push(seat);
                });
                setFilteredRows(updatedRows);
                return;
            }

            recommendedSeats = validPairs[Math.floor(Math.random() * validPairs.length)];
        } else {
            let shuffled = [...freeSeats].sort(() => 0.5 - Math.random());
            recommendedSeats = shuffled.slice(0, selectedPeople);
        }

        const selectedSeats = Array.isArray(recommendedSeats) ? recommendedSeats : [recommendedSeats];

        const updatedSeats = allSeats.map(seat =>
            selectedSeats.some(sel => sel.id === seat.id)
                ? { ...seat, recommended: true }
                : { ...seat, recommended: false }
        );

        const updatedRows = {A: [], B: [], C: [], D: [], E: [], F: []};
        updatedSeats.forEach(seat => {
            const row = seat.seatNumber.charAt(0);
            updatedRows[row].push(seat);
        });
        setFilteredRows(updatedRows);
    }

    const resetFilters = () => {
        setFilteredRows(rows);
        recommendSeats(rows);
    }

    const handleSelectPeople = (value) => {
        setSelectedPeople(value);
    }

    useEffect(() => {
        recommendSeats(filteredRows, selectedPeople === 2);
    }, [selectedPeople]);

    return (
        <div className="flightseat">
            <div className="airplane-background" style={{backgroundImage: `url(${airplaneImage})`}}>
                <div className="seat-container">
                    <h1>Select Seats for Flight {flight.flightNumber}</h1>
                    <h3>Select number of people</h3>
                    <div>
                        <button onClick={() => handleSelectPeople(1)}>1 person</button>
                        <button onClick={() => handleSelectPeople(2)}>2 people</button>
                    </div>
                    <div className="filters">
                        <button onClick={() => filterSeats("nearWindow")}>Show Window seats</button>
                        <button onClick={() => filterSeats("nearExit")}>Show near Exit seats</button>
                        <button onClick={() => filterSeats("footSpace")}>Show seats with foot space</button>
                        <button
                            onClick={filterTwoFreeSeats}
                            disabled={selectedPeople !== 2}
                        >
                            Free Seats next to each other
                        </button>
                        <button onClick={() => resetFilters()}>Reset Filters</button>
                    </div>
                    <div>
                        {Object.keys(filteredRows).map((rowKey, index) => (
                            <React.Fragment key={rowKey}>
                            <div className="seat-row">
                                {filteredRows[rowKey].map(seat => (
                                <button key={seat.id} className= {`seat ${seat.occupied ? "occupied" : ""} ${seat.recommended ? "recommended-seat" : ""} ${seat.hidden ? "dimmed-seat" : ""}`}>
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
