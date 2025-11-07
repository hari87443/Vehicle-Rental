package com.example.demo.vehiclerental;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle name is mandatory")
    private String name;

    @NotBlank(message = "Vehicle type is mandatory")
    private String type;

    @NotNull(message = "Price per day is mandatory")
    private Double pricePerDay;

    private String imageUrl;

    // 👇 Helps differentiate OWNED and RENTED vehicles
    @Enumerated(EnumType.STRING)
    private OwnershipType ownershipType;

    // 👇 Newly added fields
    private String ownerName;

    private Integer quantity;

    // ✅ Constructors
    public Vehicle() {}

    public Vehicle(Long id, String name, String type, Double pricePerDay, String imageUrl,
                   OwnershipType ownershipType, String ownerName, Integer quantity) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.pricePerDay = pricePerDay;
        this.imageUrl = imageUrl;
        this.ownershipType = ownershipType;
        this.ownerName = ownerName;
        this.quantity = quantity;
    }

    // ✅ Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }
    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public OwnershipType getOwnershipType() {
        return ownershipType;
    }
    public void setOwnershipType(OwnershipType ownershipType) {
        this.ownershipType = ownershipType;
    }

    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

//    public Integer getQuantity() {
//        return quantity;
//    }
//    public void setQuantity(Integer quantity) {
//        this.quantity = quantity;
//    }
}
