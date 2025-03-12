package com.lackdd.flightbooker.services;

import com.lackdd.flightbooker.dtos.FlightDTO;
import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.mappers.FlightMapper;
import com.lackdd.flightbooker.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private FlightRepository repo;


    public List<FlightDTO> getFlightDTOs() {
        return repo.findAll().stream()
                .map(FlightMapper::toFlightDTO)
                .collect(Collectors.toList());
    }
}
