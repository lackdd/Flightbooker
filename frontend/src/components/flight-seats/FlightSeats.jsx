import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "./FlightSeats.css";
import airplaneImage from "/src/assets/airplane_seat_map.png";


function FlightSeats() {
    const location = useLocation();
    const flight = location.state?.flight;
    const [seats, setSeats] = useState([]);
    const [columns, setColumns] = useState([]);
    const [columnA, setColumnA] = useState([]);
    const [columnB, setColumnB] = useState([]);
    const [columnC, setColumnC] = useState([]);
    const [columnD, setColumnD] = useState([]);
    const [columnE, setColumnE] = useState([]);
    const [columnF, setColumnF] = useState([]);

    // i could try creating 6 arrays of columns each containing 16 seats and then saving them to seats
    useEffect(() => {

        const getFlightSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/seats/${flight.id}`)
                const listOfColumns = [];
                const ccolumnA = [];
                const ccolumnB = [];
                const ccolumnC = [];
                const ccolumnD = [];
                const ccolumnE = [];
                const ccolumnF = [];
                for (let i = 0; i < 96; i++) {
                    if(i < 16) {
                        ccolumnA.push(response.data[i])
                    }
                    if(i > 15 && i < 32) {
                        ccolumnB.push(response.data[i])
                    }
                    if(i > 31 && i < 48) {
                        ccolumnC.push(response.data[i])
                    }
                    if(i > 47 && i < 64) {
                        ccolumnD.push(response.data[i])
                    }
                    if(i > 63 && i < 80) {
                        ccolumnE.push(response.data[i])
                    }
                    if(i > 79 && i < 96) {
                        ccolumnF.push(response.data[i])
                    }
                }
                setColumnA(ccolumnA);
                setColumnB(ccolumnB);
                setColumnC(ccolumnC);
                setColumnD(ccolumnD);
                setColumnE(ccolumnE);
                setColumnF(ccolumnF);
            } catch (error) {
                console.log(error.message);
            }
        };
        getFlightSeats();
    }, []);


    return (
        <div className="flightseat">
        <div className="airplane-background" style={{ backgroundImage: `url(${airplaneImage})` }}>
        <div className="seat-container">
            <h1>Select Seats for Flight {flight.flightNumber}</h1>
            {/*<p>From: {flight.startingLocation} → To: {flight.destination}</p>
            <p>Departure: {flight.startingDateTime}</p>
            <p>Arrival: {flight.arrivalDateTime}</p>
            <p>Price: {flight.price}€</p>*/}
            <div>
                <div className="seat-row">
                    {columnA.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>
                <div className="seat-row">
                    {columnB.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>
                <div className="seat-row">
                    {columnC.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>

                <div className="seat-gap"></div>

                <div className="seat-row2">
                    {columnD.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>
                <div className="seat-row2">
                    {columnE.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>
                <div className="seat-row2">
                    {columnF.map(seat => (
                        <button key={seat.id} className="seat" style={{marginRight: "5px"}}>
                            {/*{seat.seatNumber}*/}
                        </button>
                    ))}
                </div>
            </div>
            {/* TODO: Add seat selection logic here */}
        </div>
        </div>
        </div>
    )
}

export default FlightSeats;



