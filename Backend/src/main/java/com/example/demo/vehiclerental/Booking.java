package com.example.demo.vehiclerental;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String username;

    @Column(name = "customer_email", nullable = true)
    public String email;
    
    @Column(name = "razorpay_order_id")
    public String razorpayOrderId;

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }


    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @NotNull(message = "Start date is mandatory")
    private LocalDate startDate;

    @NotNull(message = "End date is mandatory")
    private LocalDate endDate;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) 
    private User user;

    @NotNull
    private Double totalPrice;

    // ✅ Booking status
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.BOOKED;

    // ✅ Payment status
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    public Booking() {}

    

    public Booking(Long id, String username, String email, String razorpayOrderId, Vehicle vehicle,
			@NotNull(message = "Start date is mandatory") LocalDate startDate,
			@NotNull(message = "End date is mandatory") LocalDate endDate, User user, @NotNull Double totalPrice,
			BookingStatus status, PaymentStatus paymentStatus) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.razorpayOrderId = razorpayOrderId;
		this.vehicle = vehicle;
		this.startDate = startDate;
		this.endDate = endDate;
		this.user = user;
		this.totalPrice = totalPrice;
		this.status = status;
		this.paymentStatus = paymentStatus;
	}
	// Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
    
    
}
