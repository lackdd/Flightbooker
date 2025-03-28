package com.lackdd.flightbooker.seeders;

import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.entities.FlightSeat;
import com.lackdd.flightbooker.repositories.FlightRepository;
import com.lackdd.flightbooker.repositories.FlightSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.*;
import java.time.ZoneId;

@Component
public class FlightSeeder implements CommandLineRunner {

    @Autowired
    private FlightRepository repo;

    @Autowired
    private FlightSeatRepository seatRepo;

    private static final Random random = new Random();

    public String randomFlightNumber() {
        int rand = random.nextInt(100, 200);
        String flightNumber = "BT" + rand;
        return flightNumber;
    }

    public double randomPrice() {
        double rand = random.nextDouble(100, 1000);
        return Math.round(rand * 10.0) / 10.0;
    }

    public List<FlightSeat> generateSeats(Flight flight, String column) {
        List<FlightSeat> seats = new ArrayList<>();
        for (int i = 1; i < 17; i++) {
            FlightSeat seat = new FlightSeat();

            seat.setSeatNumber(column + i);

            double rand = random.nextDouble();
            if(rand < 0.4) {
                seat.setOccupied(true);
            } else {
                seat.setOccupied(false);
            }

            if(column == "A" || column == "F") {
                seat.setNearWindow(true);
            } else {
                seat.setNearWindow(false);
            }

            Set<String> seatsWithFootSpace = Set.of("A1", "B1", "C1", "D1", "E1", "F1");
            if(seatsWithFootSpace.contains(seat.getSeatNumber())) {
                seat.setFootSpace(true);
            } else {
                seat.setFootSpace(false);
            }

            seat.setFreeSeatNextToIt(false);

            Set<String> seatsNearExit = Set.of("F5", "F6", "F7", "F8", "F9", "E6", "E7", "E8", "A5", "A6", "A7", "A8", "A9", "B6", "B7", "B8");

            if(seatsNearExit.contains(seat.getSeatNumber())) {
                seat.setNearExit(true);
            } else {
                seat.setNearExit(false);
            }

            seat.setFlight(flight);

            seats.add(seat);
        }
        return seats;
    }

    private class DestinationDetails {
        String destination;
        String destinationCity;
        String destinationCountry;
        String destinationIATA;
        int durationMinutes;

        private DestinationDetails(String destination, String destinationCity, String destinationCountry, String destinationIATA, int durationMinutes) {
            this.destination = destination;
            this.destinationCity = destinationCity;
            this.destinationCountry = destinationCountry;
            this.destinationIATA = destinationIATA;
            this.durationMinutes = durationMinutes;
        }
    }

    // used AI to generate sample data to reduce redundant time
    private final List<DestinationDetails> destinationDetailsList = new ArrayList<>(Arrays.asList(
            new DestinationDetails("Hartsfield-Jackson Atlanta International Airport", "Atlanta", "United States", "ATL", 600),
            new DestinationDetails("Beijing Capital International Airport", "Beijing", "China", "PEK", 570),
            new DestinationDetails("Heathrow Airport", "London", "United Kingdom", "LHR", 150),
            new DestinationDetails("Tokyo Haneda Airport", "Tokyo", "Japan", "HND", 660),
            new DestinationDetails("Los Angeles International Airport", "Los Angeles", "United States", "LAX", 780),
            new DestinationDetails("Dubai International Airport", "Dubai", "United Arab Emirates", "DXB", 390),
            new DestinationDetails("Paris Charles de Gaulle Airport", "Paris", "France", "CDG", 165),
            new DestinationDetails("Frankfurt Airport", "Frankfurt", "Germany", "FRA", 120),
            new DestinationDetails("Singapore Changi Airport", "Singapore", "Singapore", "SIN", 720),
            new DestinationDetails("Sydney Kingsford Smith Airport", "Sydney", "Australia", "SYD", 1080)
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

    @Override
    public void run(String...args) {

        if (repo.count() > 0) {
            System.out.println("Database already has data, stopping sample data generation.");
            return;
        }

        List<Flight> flights = new ArrayList<>();

        for(int i = 0; i < 100; i++) {
            Flight flight = new Flight();

            flight.setFlightNumber(randomFlightNumber());
            flight.setStartingLocation("Tallinn Airport");
            flight.setStartingLocationCity("Tallinn");
            flight.setStartingLocationCountry("Estonia");
            flight.setStartingLocationIATA("TLL");

            DestinationDetails destinationDetails = randomDestinationDetails(destinationDetailsList);

            flight.setDestination(destinationDetails.destination);
            flight.setDestinationCity(destinationDetails.destinationCity);
            flight.setDestinationCountry(destinationDetails.destinationCountry);
            flight.setDestinationIATA(destinationDetails.destinationIATA);

            flight.setPrice(randomPrice());
            flight.setStartingDateTime(randomStartingDateTime());
            flight.setArrivalDateTime(flight.getStartingDateTime().plusMinutes(destinationDetails.durationMinutes));
            flight.setDuration(destinationDetails.durationMinutes);

            flights.add(flight);
        }
        repo.saveAll(flights);

        for (Flight flight : flights) {
            List<FlightSeat> allSeats = new ArrayList<>();
            allSeats.addAll(generateSeats(flight, "A"));
            allSeats.addAll(generateSeats(flight, "B"));
            allSeats.addAll(generateSeats(flight, "C"));
            allSeats.addAll(generateSeats(flight, "D"));
            allSeats.addAll(generateSeats(flight, "E"));
            allSeats.addAll(generateSeats(flight, "F"));

            flight.setSeats(allSeats);

            // checking what seats have a free seat next to it now that occupied seats have been generated
            for (FlightSeat seat : flight.getSeats()) {
                String column = seat.getSeatNumber().substring(0, 1);
                char nextColumn = (char) (column.charAt(0) + 1);
                char prevColumn = (char) (column.charAt(0) - 1);
                Integer row = Integer.parseInt(seat.getSeatNumber().substring(1));

                String nextSeatNumber = (column.equals("F")) ? null : nextColumn + row.toString();
                String prevSeatNumber = (column.equals("A")) ? null : prevColumn + row.toString();

                FlightSeat nextSeat = flight.getSeatByNumber(nextSeatNumber);
                FlightSeat prevSeat = flight.getSeatByNumber(prevSeatNumber);

                if((nextSeat != null && !nextSeat.isOccupied()) || (prevSeat != null && !prevSeat.isOccupied())) {
                    seat.setFreeSeatNextToIt(true);
                }
            }

            seatRepo.saveAll(allSeats);
        }

        System.out.println("100 flights added successfully");
    }

}
