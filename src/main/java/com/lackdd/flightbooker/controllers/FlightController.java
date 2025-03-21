package com.lackdd.flightbooker.controllers;

import com.lackdd.flightbooker.dtos.FlightDTO;
import com.lackdd.flightbooker.entities.Flight;
import com.lackdd.flightbooker.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class FlightController {

    @Autowired
    private FlightService service;

    @GetMapping("/flights")
    public ResponseEntity<?> getFlightDTOs() {
        List<FlightDTO> flights = service.getFlightDTOs();
        return ResponseEntity.ok(flights);
    }
}
