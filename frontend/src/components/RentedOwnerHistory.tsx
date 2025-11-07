import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl?: string;
  ownershipType: string;
  ownerName: string;
  quantity: number;
}

const RentedOwnerHistory: React.FC = () => {
  const [data, setData] = useState<Record<string, Vehicle[]>>({});

  useEffect(() => {
    fetchRentedOwnerVehicles();
  }, []);

  const fetchRentedOwnerVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicles/rented/owners");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching rented owner vehicles", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-info fw-bold">🏠 Rented Owner History</h2>

      {Object.keys(data).length === 0 ? (
        <p className="text-center text-muted">No rented owners found.</p>
      ) : (
        Object.entries(data).map(([owner, vehicles]) => (
          <div key={owner} className="mb-5">
            <h4 className="text-primary fw-bold mb-3">👤 Owner: {owner}</h4>

            <div
              className="d-flex overflow-auto pb-3"
              style={{ gap: "20px", whiteSpace: "nowrap" }}
            >
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="card shadow-sm border-info"
                  style={{
                    minWidth: "250px",
                    maxWidth: "250px",
                    flex: "0 0 auto",
                  }}
                >
                  {v.imageUrl && (
                    <img
                      src={`http://localhost:8772${v.imageUrl}`}
                      alt={v.name}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title text-info fw-bold">{v.name}</h6>
                    <p className="card-text small mb-1">
                      <strong>Type:</strong> {v.type}
                    </p>
                    <p className="card-text small mb-1">
                      <strong>Price:</strong> ₹{v.pricePerDay}/day
                    </p>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RentedOwnerHistory;
