package com.lackdd.flightbooker.services;

import com.lackdd.flightbooker.dtos.FlightSeatDTO;
import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.mappers.FlightMapper;
import com.lackdd.flightbooker.repositories.FlightSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightSeatService {

    @Autowired
    private FlightSeatRepository repo;

    public List<FlightSeatDTO> getFlightSeatDTOs(String flightNumber) {
        return repo.findByFlightNumber(flightNumber).stream()
                .map(FlightMapper::toFlightSeatDTO)
                .collect(Collectors.toList());

    }
}
