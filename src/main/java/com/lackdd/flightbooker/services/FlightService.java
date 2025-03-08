package com.lackdd.flightbooker.services;

import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository repo;


    public List<Flight> getFlights() {
        return repo.findAll();
    }
}
