import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

interface Vehicle {
  id?: number;
  name: string;
}

interface User {
  id?: number;
  name: string;
  email: string;
}

interface Booking {
  id: number;
  user: User;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      alert("🗑️ Booking deleted successfully!");
      fetchBookings();
    } catch (err) {
      alert("❌ Failed to delete booking");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-success mb-0">📜 User Booking History</h4>
          <span className="badge bg-primary fs-6">
            Total Bookings: {bookings.length}
          </span>
        </div>

        {bookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Vehicle</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.user ? b.user.name : "-"}</td>
                    <td>{b.user ? b.user.email : "-"}</td>
                    <td>{b.vehicle?.name}</td>
                    <td>{b.startDate}</td>
                    <td>{b.endDate}</td>
                    <td>₹{b.totalPrice}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status.toLowerCase() === "confirmed"
                            ? "bg-success"
                            : b.status.toLowerCase() === "pending"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          b.paymentStatus.toLowerCase() === "paid"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-muted">
            <p className="mb-0">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
