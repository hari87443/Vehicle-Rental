import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

interface Vehicle {
  id?: number;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl?: string;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles", err);
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

      const payload: Vehicle = { name, type, pricePerDay, imageUrl: imageUrl || undefined };

      if (editId) {
        await axios.put(`/api/vehicles/${editId}`, payload);
        alert("✅ Vehicle updated successfully!");
      } else {
        await axios.post("/api/vehicles/saveVehicles", payload);
        alert("✅ Vehicle added successfully!");
      }

      setName("");
      setType("");
      setPricePerDay(0);
      setFile(null);
      setPreview(null);
      setEditId(null);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save vehicle");
    }
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
    setPreview(vehicle.imageUrl ? `http://localhost:8772${vehicle.imageUrl}` : null);
  };

  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await axios.delete(`/api/vehicles/${id}`);
      alert("🗑️ Vehicle deleted successfully!");
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete vehicle");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary fw-bold">🚗 Vehicle Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h5 className="card-title mb-3">{editId ? "Edit Vehicle" : "Add New Vehicle"}</h5>
          <form onSubmit={handleAddOrUpdateVehicle}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price Per Day"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  required
                />
              </div>
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
                <button type="submit" className="btn btn-success me-2">
                  {editId ? "Update Vehicle" : "Add Vehicle"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditId(null);
                      setName("");
                      setType("");
                      setPricePerDay(0);
                      setPreview(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Vehicle List Section */}
      <div className="row">
        {vehicles.map((v) => (
          <div className="col-md-4 mb-4" key={v.id}>
            <div className="card shadow-sm h-100">
              {v.imageUrl && (
                <img
                  src={`http://localhost:8772${v.imageUrl}`}
                  alt={v.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-capitalize">{v.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {v.type}
                  <br />
                  <strong>Price:</strong> ₹{v.pricePerDay}/day
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(v)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(v.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {vehicles.length === 0 && (
          <p className="text-center text-muted">No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleList;


