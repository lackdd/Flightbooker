package com.lackdd.flightbooker.seeders;

import com.lackdd.flightbooker.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.time.ZoneId;

@Component
public class FlightSeeder {

    @Autowired
    private FlightRepository repo;

    private static final Random random = new Random();

    public String randomFlightNumber() {
        int rand = random.nextInt(100, 200);
        String flightNumber = "BT" + rand;
        return flightNumber;
    }

    public double randomPrice() {
        double rand = random.nextDouble(100, 1000);
        return rand;
    }

    private class DestinationDetails {
        String destination;
        String destinationCity;
        String destinationCountry;
        String destinationIATA;

        private DestinationDetails(String destination, String destinationCity, String destinationCountry, String destinationIATA) {
            this.destination = destination;
            this.destinationCity = destinationCity;
            this.destinationCountry = destinationCountry;
            this.destinationIATA = destinationIATA;
        }
    }

    private final List<DestinationDetails> destinationDetailsList = new ArrayList<>(Arrays.asList(
    new DestinationDetails("Hartsfield-Jackson Atlanta International Airport", "Atlanta", "United States", "ATL"),
        new DestinationDetails("Beijing Capital International Airport", "Beijing", "China", "PEK"),
        new DestinationDetails("Heathrow Airport", "London", "United Kingdom", "LHR"),
        new DestinationDetails("Tokyo Haneda Airport", "Tokyo", "Japan", "HND"),
        new DestinationDetails("Los Angeles International Airport", "Los Angeles", "United States", "LAX"),
        new DestinationDetails("Dubai International Airport", "Dubai", "United Arab Emirates", "DXB"),
        new DestinationDetails("Paris Charles de Gaulle Airport", "Paris", "France", "CDG"),
        new DestinationDetails("Frankfurt Airport", "Frankfurt", "Germany", "FRA"),
        new DestinationDetails("Singapore Changi Airport", "Singapore", "Singapore", "SIN"),
        new DestinationDetails("Sydney Kingsford Smith Airport", "Sydney", "Australia", "SYD")
        ));

    public DestinationDetails randomDestinationDetails(List<DestinationDetails> destinationDetailsList) {
        int rand = random.nextInt(10);
        return destinationDetailsList.get(rand);
    }

    public ZonedDateTime randomStartingDateTime() {
        int randomDays = random.nextInt(10, 20);
        int randomHours = random.nextInt(0, 24);
        List<Integer> minutesList = new ArrayList<>(Arrays.asList(
                0, 10, 20, 30, 40, 50
        ));
        int randomMinutes = minutesList.get(random.nextInt(minutesList.size()));
        return ZonedDateTime.of(2025, 3, randomDays, randomHours, randomMinutes, 0, 0, ZoneId.of("Europe/Tallinn"));
    }

    /* initialize faker
     initializer random

     implement commandloader and create run block

     I want to generate every data bit randomly for my flights so i would have loads of randomly generated flights
     Datapoints:
     1) flightNumber - i want to have the first two letters as BA (airBaltic) always followed up by random numbers generated between 100 and 200
     2) startingLocation - i want the startingLocation to always be Tallinn Airport
     3) startingLocationCity - Always Tallinn
     4) startingLocationCountry - always Estonia
     5) startingLocationIATA - always TLL
     6) destination - i want a list of 10 different airports from abroad, the destination will be randomly generated between them
     7) destinationCity - i want the destination info to be derived from destination in here, like instead of having destination
     8) destinationCountry   have destinationAllInfo or smth and derive everything from it, cant randomly generate it all else it wont
     9) destinationIATA      match
     10) price  - randomly generated between 100€ and 1000€, might use a floating type for cents aswell
     11) startingDateTime - i'm thinking of generating between for example 10. march 2025, 20. march 2025
     12) arrivalDateTime - maybe generate between 11. march and 20. march 2025?
     13) duration would be derived from subtracting startingDateTime from arrivalDateTime, no random generating here

     this first impression would mean that if i generated 100 examples they would all be divided by destination by 10% on average
     if i had 10 destinations, then say those 10 flights for that destination would also get diluted by startingDateTime and
     arrivalDateTime if i let the client choose the starting and arrival dates
     I'm going to create a huge board full of all the flights i have and the person can filter through them
     people mostly choose their flights by destination, startingDateTime, arrivalDateTime, i have to be careful to not generate
     an arrival time in the past, maybe it would be a good idea here to first generate a startingDateTime and then let the script
     generate the arrivalDateTime

    */

}
