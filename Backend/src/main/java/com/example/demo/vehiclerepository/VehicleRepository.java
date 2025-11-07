package com.example.demo.vehiclerepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.demo.vehiclerental.Vehicle;
import com.example.demo.vehiclerental.OwnershipType;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // 👇 New method: find vehicles based on ownership type
    List<Vehicle> findByOwnershipType(OwnershipType ownershipType);
}
