import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  pricePerDay: number;
}

interface Booking {
  id: number;
  username: string;
  email: string;
  razorpayOrderId?: string | null;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
}

const BookingDetails: React.FC<{ bookingId: number }> = ({ bookingId }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [message, setMessage] = useState("");

  const fetchBookingById = async (id: number) => {
    try {
      const res = await axios.get(`/api/bookings/${id}`);
      setBooking(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch booking details.");
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingById(bookingId);
    }
  }, [bookingId]);

  if (message) return <p>{message}</p>;
  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
      <p><strong>Booking ID:</strong> {booking.id}</p>
      <p><strong>Username:</strong> {booking.username}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Vehicle Name:</strong> {booking.vehicle.name}</p>
      <p><strong>Type:</strong> {booking.vehicle.type}</p>
      <p><strong>Price/Day:</strong> ₹{booking.vehicle.pricePerDay}</p>
      <p><strong>Start Date:</strong> {booking.startDate}</p>
      <p><strong>End Date:</strong> {booking.endDate}</p>
      <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
    </div>
  );
};

export default BookingDetails;
