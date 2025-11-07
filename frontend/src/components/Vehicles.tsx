import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import VehicleList from "./VehicleList";
import BookingHistory from "./BookingHistory";
import RentedVehicleList from "./RentedVehicleList";
import RentedOwnerHistory from "./RentedOwnerHistory"; // ✅ Import your new page
import "bootstrap/dist/css/bootstrap.min.css";

const Vehicles: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-2">
          🚗 Vehicle Management (Admin Panel)
        </h2>
        <p className="text-muted">
          Manage vehicles, add rented vehicles, view owner histories, and see user booking records.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => navigate("/vehicles/list")}
          className="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm"
        >
          ➕ Owned Vehicles
        </button>

        <button
          onClick={() => navigate("/vehicles/rented")}
          className="btn btn-warning px-4 py-2 rounded-3 fw-semibold shadow-sm"
        >
          🚙 Add Rented Vehicles
        </button>

        <button
          onClick={() => navigate("/vehicles/bookings")}
          className="btn btn-success px-4 py-2 rounded-3 fw-semibold shadow-sm"
        >
          📜 User Booking History
        </button>

        {/* ✅ New Button for Rented Owner History */}
        <button
          onClick={() => navigate("/vehicles/owners")}
          className="btn btn-info px-4 py-2 rounded-3 fw-semibold shadow-sm text-white"
        >
          👤 Rented Owner History
        </button>
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Sub-Routes */}
      <div className="card shadow-sm border-0 p-4 rounded-4">
        <Routes>
          <Route path="/list" element={<VehicleList />} />
          <Route path="/rented" element={<RentedVehicleList />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/owners" element={<RentedOwnerHistory />} /> {/* ✅ Added route */}
        </Routes>
      </div>
    </div>
  );
};

export default Vehicles;
