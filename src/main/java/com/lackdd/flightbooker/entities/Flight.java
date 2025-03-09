package com.lackdd.flightbooker.entities;

import jakarta.persistence.*;

import java.time.*;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "flight_number")
    private String flightNumber;

    @Column(name = "starting_location")
    private String startingLocation;

    @Column(name = "starting_location_city")
    private String startingLocationCity;

    @Column(name = "starting_location_country")
    private String startingLocationCountry;

    @Column(name = "starting_location_IATA")
    private String startingLocationIATA;

    private String destination;

    @Column(name = "destination_city")
    private String destinationCity;

    @Column(name = "destination_country")
    private String destinationCountry;

    @Column(name = "destination_IATA")
    private String destinationIATA;

    private double price;

    @Column(name = "starting_date_time", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime startingDateTime;

    @Column(name = "arrival_date_time", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime arrivalDateTime;

    @Column(name = "duration")
    private Integer duration;

    public Flight() {}

    public Flight(Integer id, String flightNumber, String startingLocation, String startingLocationCity, String startingLocationIATA, String startingLocationCountry, String destination, String destinationCountry, String destinationCity, double price, String destinationIATA, ZonedDateTime arrivalDateTime, ZonedDateTime startingDateTime, Integer duration) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.startingLocation = startingLocation;
        this.startingLocationCity = startingLocationCity;
        this.startingLocationIATA = startingLocationIATA;
        this.startingLocationCountry = startingLocationCountry;
        this.destination = destination;
        this.destinationCountry = destinationCountry;
        this.destinationCity = destinationCity;
        this.price = price;
        this.destinationIATA = destinationIATA;
        this.arrivalDateTime = arrivalDateTime;
        this.startingDateTime = startingDateTime;
        this.duration = duration;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
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

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getStartingLocationCity() {
        return startingLocationCity;
    }

    public void setStartingLocationCity(String startingLocationCity) {
        this.startingLocationCity = startingLocationCity;
    }

    public String getStartingLocationCountry() {
        return startingLocationCountry;
    }

    public void setStartingLocationCountry(String startingLocationCountry) {
        this.startingLocationCountry = startingLocationCountry;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getStartingLocationIATA() {
        return startingLocationIATA;
    }

    public void setStartingLocationIATA(String startingLocationIATA) {
        this.startingLocationIATA = startingLocationIATA;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public String getDestinationIATA() {
        return destinationIATA;
    }

    public void setDestinationIATA(String destinationIATA) {
        this.destinationIATA = destinationIATA;
    }
}
