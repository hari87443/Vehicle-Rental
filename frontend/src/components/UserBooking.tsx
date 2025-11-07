import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl?: string;
}

interface Booking {
  id: number;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  status: string;
  paymentStatus: string;
}

const Booking: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchVehicles();
    if (userId) fetchUserBookings(userId);
  }, [userId]);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicles");
      setVehicles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
      setMessage("❌ Failed to fetch vehicles.");
      setIsError(true);
    }
  };

  const fetchUserBookings = async (id: string) => {
    try {
      const res = await axios.get(`/api/bookings/user/${id}`);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Booking fetch error:", err);
      setMessage("❌ Failed to fetch user bookings.");
      setIsError(true);
    }
  };

  const handleBooking = async () => {
    if (!userId || !selectedVehicle) {
      setMessage("⚠️ Please login and select a vehicle.");
      setIsError(true);
      return;
    }
    if (!startDate || !endDate) {
      setMessage("⚠️ Please select valid dates.");
      setIsError(true);
      return;
    }

    try {
      await axios.post("/api/bookings/saveBooking", {
        user: { id: parseInt(userId) },
        vehicle: { id: selectedVehicle.id },
        startDate,
        endDate,
      });

      setMessage("✅ Booking successful!");
      setIsError(false);
      setSelectedVehicle(null);
      setStartDate("");
      setEndDate("");
      fetchUserBookings(userId);
    } catch (err: any) {
      console.error("Booking failed:", err);
      setMessage(err.response?.data?.message || "❌ Booking failed.");
      setIsError(true);
    }
  };

  const handlePay = async (id: number) => {
    try {
      await axios.put(`/api/bookings/pay/${id}`);
      setMessage("💰 Payment successful!");
      setIsError(false);
      if (userId) fetchUserBookings(userId);
    } catch {
      setMessage("❌ Payment failed.");
      setIsError(true);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await axios.put(`/api/bookings/cancel/${id}`);
      setMessage("🚫 Booking cancelled successfully.");
      setIsError(false);
      if (userId) fetchUserBookings(userId);
    } catch {
      setMessage("❌ Failed to cancel booking.");
      setIsError(true);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">
        🚗 Welcome {username || "User"} — Vehicle Rental Booking
      </h2>

      {/* Vehicles Grid Section */}
      <div className="row">
        {vehicles.map((v) => (
          <div className="col-md-4 mb-4" key={v.id}>
            <div className="card shadow-sm h-100">
              {v.imageUrl ? (
                <img
                  src={`http://localhost:8772${v.imageUrl}`}
                  className="card-img-top"
                  alt={v.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "180px" }}
                >
                  <span>No Image</span>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{v.name}</h5>
                <p className="card-text">
                  Type: <strong>{v.type}</strong> <br />
                  Price: <strong>₹{v.pricePerDay}/day</strong>
                </p>

                <div className="mb-2">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    min={today}
                    value={selectedVehicle?.id === v.id ? startDate : ""}
                    onChange={(e) => {
                      setSelectedVehicle(v);
                      setStartDate(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    min={startDate || today}
                    value={selectedVehicle?.id === v.id ? endDate : ""}
                    onChange={(e) => {
                      setSelectedVehicle(v);
                      setEndDate(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <button
                  className="btn btn-success w-100"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`alert mt-3 ${
            isError ? "alert-danger" : "alert-success"
          } text-center`}
        >
          {message}
        </div>
      )}

      {/* Booking History Section */}
      <h3 className="mt-5 mb-3">📋 Your Bookings</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Vehicle</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.vehicle?.imageUrl ? (
                      <img
                        src={`http://localhost:8772${b.vehicle.imageUrl}`}
                        alt={b.vehicle.name}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{b.vehicle?.name}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                  <td>{b.status}</td>
                  <td>{b.paymentStatus}</td>
                  <td>
                    {b.status === "BOOKED" && (
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </button>
                    )}
                    {b.paymentStatus === "PENDING" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handlePay(b.id)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
