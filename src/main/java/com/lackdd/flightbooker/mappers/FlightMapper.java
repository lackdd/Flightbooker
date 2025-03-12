package com.lackdd.flightbooker.mappers;

import com.lackdd.flightbooker.dtos.FlightDTO;
import com.lackdd.flightbooker.dtos.FlightSeatDTO;
import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.entities.FlightSeat;

public class FlightMapper {
    public static FlightDTO toFlightDTO(Flight flight) {
        if (flight == null) {
            return null;
        }
        return new FlightDTO(
                flight.getId(), flight.getFlightNumber(), flight.getStartingLocation(), flight.getDestination(), flight.getStartingDateTime(), flight.getArrivalDateTime(), flight.getDuration(), flight.getPrice());
    }

    public static FlightSeatDTO toFlightSeatDTO(FlightSeat seat) {
        if (seat == null) {
            return null;
        }
        return new FlightSeatDTO(
                seat.getId(), seat.getSeatNumber(), seat.isOccupied(), seat.isNearWindow(), seat.isFreeSeatNextToIt(), seat.isFootSpace(), seat.getFlight(), seat.isNearExit());
    }
}
