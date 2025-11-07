package com.example.demo.vehicleservice;

import com.example.demo.vehiclerental.*;
import com.example.demo.vehiclerepository.BookingRepository;
import com.example.demo.vehiclerepository.UserRepository;
import com.example.demo.vehiclerepository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Save booking with proper validation and price calculation
    public Booking saveBooking(Booking booking) {
        if (booking.getUser() == null || booking.getUser().getId() == null) {
            throw new RuntimeException("User information is missing for the booking");
        }

        if (booking.getVehicle() == null || booking.getVehicle().getId() == null) {
            throw new RuntimeException("Vehicle information is missing for the booking");
        }

        // ✅ Fetch from DB to ensure they exist
        Vehicle vehicle = vehicleRepository.findById(booking.getVehicle().getId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        booking.setUser(user);
        booking.setVehicle(vehicle);

        // ✅ Calculate total days and price
        long days = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
        if (days <= 0) {
            throw new RuntimeException("Invalid booking duration (end date must be after start date)");
        }

        double total = vehicle.getPricePerDay() + days;
        booking.setTotalPrice(total);

        // ✅ Default statuses
        booking.setStatus(BookingStatus.BOOKED);
        booking.setPaymentStatus(PaymentStatus.PENDING);

        // ✅ Save booking
        return bookingRepository.save(booking);
    }

    // ✅ Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ Get bookings by user ID
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // ✅ Delete booking
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // ✅ Cancel booking
    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    // ✅ Payment
    public Booking makePayment(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setPaymentStatus(PaymentStatus.PAID);
        return bookingRepository.save(booking);
    }
}
