package com.lackdd.flightbooker.entities;

import jakarta.persistence.*;

@Entity
public class FlightSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String seatNumber;
    private boolean occupied;
    private boolean nearWindow;
    private boolean footSpace;
    private boolean freeSeatNextToIt;
    private boolean nearExit;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;


    public FlightSeat() {
    }

    public FlightSeat(Integer id, String seatNumber, boolean occupied, boolean nearWindow, boolean footSpace, boolean freeSeatNextToIt, boolean nearExit, Flight flight) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.occupied = occupied;
        this.nearWindow = nearWindow;
        this.footSpace = footSpace;
        this.freeSeatNextToIt = freeSeatNextToIt;
        this.nearExit = nearExit;
        this.flight = flight;
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

    public boolean isFootSpace() {
        return footSpace;
    }

    public void setFootSpace(boolean footSpace) {
        this.footSpace = footSpace;
    }

    public boolean isNearWindow() {
        return nearWindow;
    }

    public void setNearWindow(boolean nearWindow) {
        this.nearWindow = nearWindow;
    }

    public boolean isFreeSeatNextToIt() {
        return freeSeatNextToIt;
    }

    public void setFreeSeatNextToIt(boolean freeSeatNextToIt) {
        this.freeSeatNextToIt = freeSeatNextToIt;
    }

    public boolean isNearExit() {
        return nearExit;
    }

    public void setNearExit(boolean nearExit) {
        this.nearExit = nearExit;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
