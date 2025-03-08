package com.lackdd.flightbooker.entities;

import jakarta.persistence.*;

import java.time.*;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String startingLocation;
    private String destination;
    private double price;
    private ZonedDateTime startingDateTime;
    private ZonedDateTime arrivalDateTime;
    private Duration duration;

    public Flight() {}

    public Flight(String name, String startingLocation, String destination, double price, ZonedDateTime startingDateTime, ZonedDateTime arrivalDateTime, Duration duration) {
        this.name = name;
        this.startingLocation = startingLocation;
        this.destination = destination;
        this.price = price;
        this.startingDateTime = startingDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.duration = duration;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public ZonedDateTime getStartingDateTime() {
        return startingDateTime;
    }
    public void setStartingDateTime(ZonedDateTime startingDateTime) {
        this.startingDateTime = startingDateTime;
    }
    public ZonedDateTime getArrivalDateTime() {
        return arrivalDateTime;
    }
    public void setArrivalDateTime(ZonedDateTime arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime;
    }
    public Duration getDuration() {
        return duration;
    }
    public void setDuration(Duration duration) {
        this.duration = duration;
    }
}
