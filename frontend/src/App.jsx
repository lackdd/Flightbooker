import './App.css'
import FlightSchedule from "./components/flight-schedule/FlightSchedule.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/schedule" replace />} />
                <Route path="/schedule" element={<FlightSchedule />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
