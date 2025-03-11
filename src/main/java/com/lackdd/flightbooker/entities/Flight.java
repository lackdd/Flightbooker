package com.lackdd.flightbooker.entities;

import jakarta.persistence.*;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FlightSeat> seats = new ArrayList<>();

    public Flight() {}

    public Flight(Integer id, String startingLocation, String flightNumber, String startingLocationCity, String startingLocationCountry, String destination, String destinationCity, String startingLocationIATA, String destinationIATA, String destinationCountry, double price, ZonedDateTime startingDateTime, ZonedDateTime arrivalDateTime, Integer duration, List<FlightSeat> seats) {
        this.id = id;
        this.startingLocation = startingLocation;
        this.flightNumber = flightNumber;
        this.startingLocationCity = startingLocationCity;
        this.startingLocationCountry = startingLocationCountry;
        this.destination = destination;
        this.destinationCity = destinationCity;
        this.startingLocationIATA = startingLocationIATA;
        this.destinationIATA = destinationIATA;
        this.destinationCountry = destinationCountry;
        this.price = price;
        this.startingDateTime = startingDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.duration = duration;
        this.seats = seats;
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
        this.startingDateTime = startingDateTime.withZoneSameInstant(ZoneOffset.UTC);
    }
    public ZonedDateTime getArrivalDateTime() {
        return arrivalDateTime;
    }
    public void setArrivalDateTime(ZonedDateTime arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime.withZoneSameInstant(ZoneOffset.UTC);
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

    public List<FlightSeat> getSeats() {
        return seats;
    }

    public void setSeats(List<FlightSeat> seats) {
        this.seats = seats;
    }
}
