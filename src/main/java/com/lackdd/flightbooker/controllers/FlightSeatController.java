package com.lackdd.flightbooker.controllers;

import com.lackdd.flightbooker.dtos.FlightSeatDTO;
import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.entities.FlightSeat;
import com.lackdd.flightbooker.repositories.FlightSeatRepository;
import com.lackdd.flightbooker.services.FlightSeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class FlightSeatController {

    @Autowired
    private FlightSeatRepository seatRepo;

    @Autowired
    private FlightSeatService service;

    @GetMapping("/seats/{flightId}")
    public ResponseEntity<?> getFlightSeatDTOs(@PathVariable Integer flightId) {
        List<FlightSeatDTO> seats = service.getFlightSeatDTOs(flightId);
        return ResponseEntity.ok(seats);
    }


}
