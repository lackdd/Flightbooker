package com.lackdd.flightbooker.controllers;

import com.lackdd.flightbooker.repositories.FlightSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http:localhost:5173")
@RestController
@RequestMapping("/api")
public class FlightSeatController {

    @Autowired
    private FlightSeatRepository seatRepo;


}
