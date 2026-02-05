import { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSearch = async () => {
    if (!address) return alert("Enter an address first.");

    const key = process.env.REACT_APP_GOOGLE_KEY;
    if (!key) return alert("Missing Google API key.");

    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${key}`
    );

    const geoData = await geoRes.json();

    if (geoData.status !== "OK") {
      alert("Geocoding failed: " + geoData.status);
      return;
    }

    const location = geoData.results[0].geometry.location;

    const streetView = `https://maps.googleapis.com/maps/api/streetview?size=800x500&location=${location.lat},${location.lng}&key=${key}`;

    setImageUrl(streetView);
  };

  return (
    <div style={{ padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h2>FTS Property Visual</h2>

      <input
        type="text"
        placeholder="Enter property address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          marginTop: 10,
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          cursor: "pointer"
        }}
      >
        Get Street View
      </button>

      {imageUrl && (
        <div style={{ marginTop: 16 }}>
          <img
            src={imageUrl}
            alt="Street View"
            style={{ width: "100%", borderRadius: 10 }}
          />
        </div>
      )}
    </div>
  );
}
