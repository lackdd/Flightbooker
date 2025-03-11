package com.lackdd.flightbooker.repositories;


import com.lackdd.flightbooker.entities.FlightSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightSeatRepository extends JpaRepository<FlightSeat, Integer> {
}
