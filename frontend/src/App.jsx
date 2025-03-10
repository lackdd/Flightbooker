import './App.css'
import FlightSchedule from "./components/flight-schedule/FlightSchedule.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import FlightSeats from "./components/flight-seats/FlightSeats.jsx";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/schedule" replace />} />
                <Route path="/schedule" element={<FlightSchedule />} />
                <Route path="/seats/:flightId" element={<FlightSeats />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
