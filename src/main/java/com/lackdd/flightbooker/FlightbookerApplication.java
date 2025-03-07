package com.lackdd.flightbooker;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FlightbookerApplication {
    static {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("POSTGRES_URL", dotenv.get("POSTGRES_URL"));
        System.setProperty("POSTGRES_USERNAME", dotenv.get("POSTGRES_USERNAME"));
        System.setProperty("POSTGRES_PASSWORD", dotenv.get("POSTGRES_PASSWORD"));
    }

    public static void main(String[] args) {
        SpringApplication.run(FlightbookerApplication.class, args);
    }

}
