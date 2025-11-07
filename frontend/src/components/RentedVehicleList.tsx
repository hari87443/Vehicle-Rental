import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

interface Vehicle {
  id?: number;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl?: string;
  ownershipType: string;
  ownerName: string;
  quantity: number;
}

const RentedVehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [ownerName, setOwnerName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchRentedVehicles();
  }, []);

  const fetchRentedVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicles/rented");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching rented vehicles", err);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/api/vehicles/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error("Image upload failed", err);
      alert("❌ Failed to upload image");
      return null;
    }
  };

  const handleAddOrUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (file) imageUrl = await uploadImage();

      const payload: Vehicle = {
        name,
        type,
        pricePerDay,
        imageUrl: imageUrl || undefined,
        ownershipType: "RENTED",
        ownerName,
        quantity,
      };

      if (editId) {
        await axios.put(`/api/vehicles/${editId}`, payload);
        alert("✅ Rented vehicle updated successfully!");
      } else {
        await axios.post("/api/vehicles/saveVehicles", payload);
        alert("✅ Rented vehicle added successfully!");
      }

      resetForm();
      fetchRentedVehicles();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save rented vehicle");
    }
  };

  const resetForm = () => {
    setName("");
    setType("");
    setPricePerDay(0);
    setOwnerName("");
    setQuantity(1);
    setFile(null);
    setPreview(null);
    setEditId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditId(vehicle.id || null);
    setName(vehicle.name);
    setType(vehicle.type);
    setPricePerDay(vehicle.pricePerDay);
    setOwnerName(vehicle.ownerName);
    setQuantity(vehicle.quantity);
    setPreview(vehicle.imageUrl ? `http://localhost:8772${vehicle.imageUrl}` : null);
  };

  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm("Are you sure you want to delete this rented vehicle?")) return;
    try {
      await axios.delete(`/api/vehicles/${id}`);
      alert("🗑️ Rented vehicle deleted successfully!");
      fetchRentedVehicles();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete rented vehicle");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-warning fw-bold">🚙 Rented Vehicle Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-5 border-warning">
        <div className="card-body">
          <h5 className="card-title mb-3 text-warning">
            {editId ? "Edit Rented Vehicle" : "Add New Rented Vehicle"}
          </h5>
          <form onSubmit={handleAddOrUpdateVehicle}>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price Per Day"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              {/* Scrollable Quantity Selector */}
              {/* <div className="col-md-3">
                <label className="form-label">Quantity (1–100)</label>
                <div
                  style={{
                    maxHeight: "100px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  {[...Array(100)].map((_, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        id={`qty-${i + 1}`}
                        name="quantity"
                        value={i + 1}
                        checked={quantity === i + 1}
                        onChange={() => setQuantity(i + 1)}
                      />
                      <label htmlFor={`qty-${i + 1}`} className="ms-2">
                        {i + 1} Vehicle(s)
                      </label>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {preview && (
                <div className="col-md-6 text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              )}

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-warning me-2 fw-semibold">
                  {editId ? "Update Vehicle" : "Add Vehicle"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary fw-semibold"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="row">
        {vehicles.map((v) => (
          <div className="col-md-4 mb-4" key={v.id}>
            <div className="card shadow-sm h-100 border-warning">
              {v.imageUrl && (
                <img
                  src={`http://localhost:8772${v.imageUrl}`}
                  alt={v.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-capitalize text-warning">{v.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {v.type} <br />
                  <strong>Owner:</strong> {v.ownerName} <br />
                  {/* <strong>Quantity:</strong> {v.quantity} <br /> */}
                  <strong>Price:</strong> ₹{v.pricePerDay}/day
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(v)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(v.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {vehicles.length === 0 && (
          <p className="text-center text-muted">No rented vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default RentedVehicleList;
