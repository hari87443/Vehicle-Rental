package com.example.demo.controller;

import com.example.demo.vehiclerental.Vehicle;
import com.example.demo.vehiclerental.OwnershipType;
import com.example.demo.vehicleservice.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @PostMapping("/saveVehicles")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle saved = vehicleService.createVehicle(vehicle);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        Vehicle updated = vehicleService.updateVehicle(id, vehicle);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Image upload endpoint
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error uploading file: " + e.getMessage());
        }
    }

    // 👇 New endpoints to get vehicles by ownership type

    @GetMapping("/owned")
    public ResponseEntity<List<Vehicle>> getOwnedVehicles() {
        List<Vehicle> vehicles = vehicleService.getVehiclesByOwnershipType(OwnershipType.OWNED);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/rented")
    public ResponseEntity<List<Vehicle>> getRentedVehicles() {
        List<Vehicle> vehicles = vehicleService.getVehiclesByOwnershipType(OwnershipType.RENTED);
        return ResponseEntity.ok(vehicles);
    }
    @GetMapping("/rented/owners")
    public ResponseEntity<?> getRentedVehiclesGroupedByOwner() {
        List<Vehicle> vehicles = vehicleService.getVehiclesByOwnershipType(OwnershipType.RENTED);

        // Group by ownerName
        Map<String, List<Vehicle>> groupedByOwner = vehicles.stream()
                .filter(v -> v.getOwnerName() != null)
                .collect(Collectors.groupingBy(Vehicle::getOwnerName));

        return ResponseEntity.ok(groupedByOwner);
    }

}
