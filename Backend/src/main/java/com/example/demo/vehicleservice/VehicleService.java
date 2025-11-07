package com.example.demo.vehicleservice;

import com.example.demo.vehiclerental.Vehicle;
import com.example.demo.vehiclerental.OwnershipType;
import com.example.demo.vehiclerepository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + id));
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = getVehicleById(id);
        vehicle.setName(vehicleDetails.getName());
        vehicle.setType(vehicleDetails.getType());
        vehicle.setPricePerDay(vehicleDetails.getPricePerDay());
        vehicle.setImageUrl(vehicleDetails.getImageUrl());
        vehicle.setOwnershipType(vehicleDetails.getOwnershipType());
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Vehicle not found with ID: " + id);
        }
        System.out.println("🗑 Deleting vehicle with ID: " + id);
        vehicleRepository.deleteById(id);
    }

    // 👇 New method to fetch vehicles by ownership type
    public List<Vehicle> getVehiclesByOwnershipType(OwnershipType ownershipType) {
        return vehicleRepository.findByOwnershipType(ownershipType);
    }
}
