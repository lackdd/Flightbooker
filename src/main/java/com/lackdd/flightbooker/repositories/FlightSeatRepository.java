package com.lackdd.flightbooker.repositories;


import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.entities.FlightSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightSeatRepository extends JpaRepository<FlightSeat, Integer> {

    @Query("SELECT fs from FlightSeat fs WHERE fs.flight.flightNumber = :flightNumber")
    List<FlightSeat> findByFlightNumber(String flightNumber);
}
