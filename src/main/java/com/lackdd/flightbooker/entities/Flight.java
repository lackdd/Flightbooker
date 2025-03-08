package com.lackdd.flightbooker.entities;

import jakarta.persistence.*;

import java.time.*;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "starting_location")
    private String startingLocation;

    private String destination;
    private double price;

    @Column(name = "starting_date_time", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime startingDateTime;

    @Column(name = "arrival_date_time", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime arrivalDateTime;

    @Column(name = "duration")
    private Integer duration;

    public Flight() {}

    public Flight(Integer id, String name, String startingLocation, String destination, double price, ZonedDateTime startingDateTime, ZonedDateTime arrivalDateTime, Integer duration) {
        this.id = id;
        this.name = name;
        this.startingLocation = startingLocation;
        this.destination = destination;
        this.price = price;
        this.startingDateTime = startingDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.duration = duration;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
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
    public Integer getDuration() {
        return duration;
    }
    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
