import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-center text-white">
        <div className="container">
          <h1 className="fw-bold mb-3">Find Your Perfect Ride</h1>
          <p className="mb-4">
            Affordable rentals, top-quality vehicles, and easy bookings — all in
            one place.
          </p>
          {/* <Link to="/UserBooking" className="btn btn-warning btn-lg">
            Browse Vehicles
          </Link> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">Why Choose Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-3 border-0 shadow-sm">
                <h5 className="fw-bold">Wide Range</h5>
                <p>Choose from affordable cars and luxury cars to suit your journey.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 border-0 shadow-sm">
                <h5 className="fw-bold">Affordable Prices</h5>
                <p>Enjoy transparent and budget-friendly rental rates with no hidden costs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 border-0 shadow-sm">
                <h5 className="fw-bold">Easy Booking</h5>
                <p>Book in just a few clicks — simple, fast, and convenient.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center text-white py-5">
        <div className="container">
          <h2 className="fw-bold mb-3">Start Your Journey Today!</h2>
          <Link to="/user/register" className="btn btn-warning btn-lg">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
