package com.lackdd.flightbooker.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.ZonedDateTime;

public class FlightDTO {
    private Integer id;
    private String flightNumber;
    private String startingLocation;
    private String destination;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX", timezone = "UTC")
    private ZonedDateTime startingDateTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX", timezone = "UTC")
    private ZonedDateTime arrivalDateTime;
    private double price;
    private Integer duration;

    public FlightDTO() {
    }

    public FlightDTO(Integer id, String flightNumber, String startingLocation, String destination, ZonedDateTime startingDateTime, ZonedDateTime arrivalDateTime, Integer duration, double price) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.destination = destination;
        this.startingLocation = startingLocation;
        this.startingDateTime = startingDateTime;
        this.price = price;
        this.arrivalDateTime = arrivalDateTime;
        this.duration = duration;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public ZonedDateTime getStartingDateTime() {
        return startingDateTime;
    }

    public void setStartingDateTime(ZonedDateTime startingDateTime) {
        this.startingDateTime = startingDateTime;
    }

    public String getStartingLocation() {
        return startingLocation;
    }

    public void setStartingLocation(String startingLocation) {
        this.startingLocation = startingLocation;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public ZonedDateTime getArrivalDateTime() {
        return arrivalDateTime;
    }

    public void setArrivalDateTime(ZonedDateTime arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
