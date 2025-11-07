import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";
import Vehicles from "./components/Vehicles";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import Booking from "./components/UserBooking";
import VehicleList from "./components/VehicleList";
import BookingHistory from "./components/BookingHistory";
import Layout from "./components/Layout";
import Home from "./components/Home";
import UserBooking from "./components/UserBooking";
import RentedVehicleList from "./components/RentedVehicleList";
import RentedOwnerHistory from "./components/RentedOwnerHistory";

const App: React.FC = () => {
  return (
    <Router>
      {/* 🔹 Top Navigation Bar */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          marginBottom: "20px",
        }}
      >
        <Link to="/admin/login" style={{ marginRight: "15px" }}>
          Admin Login
        </Link>
      </div>

      {/* 🔹 Routes */}
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Vehicle Management (all vehicle-related pages nested inside) */}
        <Route path="/vehicles/*" element={<Vehicles />} />

        {/* User Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/UserBooking" element={<Booking />} />
        <Route path="/UserBooking" element={<UserBooking />} />

        {/* Other Direct Routes (optional, if you still want standalone access) */}
        <Route path="/vehicles/list" element={<VehicleList />} />
        <Route path="/vehicles/bookings" element={<BookingHistory />} />
        <Route path="/vehicles/rented" element={<RentedVehicleList />} />
        <Route path="/vehicles/owners" element={<RentedOwnerHistory />} />

        {/* Layout / Home */}
        <Route path="/" element={<Home />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
