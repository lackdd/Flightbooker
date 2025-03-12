package com.lackdd.flightbooker.dtos;

import com.lackdd.flightbooker.entities.Flight;

public class FlightSeatDTO {
    private Integer id;

    private String seatNumber;
    private boolean occupied;
    private boolean nearWindow;
    private boolean footSpace;
    private boolean freeSeatNextToIt;
    private boolean nearExit;
    private Flight flight;

    public FlightSeatDTO() {
    }

    public FlightSeatDTO(Integer id, String seatNumber, boolean occupied, boolean nearWindow, boolean freeSeatNextToIt, boolean footSpace, Flight flight, boolean nearExit) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.occupied = occupied;
        this.nearWindow = nearWindow;
        this.freeSeatNextToIt = freeSeatNextToIt;
        this.footSpace = footSpace;
        this.flight = flight;
        this.nearExit = nearExit;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }

    public boolean isNearWindow() {
        return nearWindow;
    }

    public void setNearWindow(boolean nearWindow) {
        this.nearWindow = nearWindow;
    }

    public boolean isFootSpace() {
        return footSpace;
    }

    public void setFootSpace(boolean footSpace) {
        this.footSpace = footSpace;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public boolean isNearExit() {
        return nearExit;
    }

    public void setNearExit(boolean nearExit) {
        this.nearExit = nearExit;
    }

    public boolean isFreeSeatNextToIt() {
        return freeSeatNextToIt;
    }

    public void setFreeSeatNextToIt(boolean freeSeatNextToIt) {
        this.freeSeatNextToIt = freeSeatNextToIt;
    }
}
