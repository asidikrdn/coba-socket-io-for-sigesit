import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Monitoring from "./Monitoring.js";
import Update from "./Update.js";

export default function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Cobain Socket.IO</h1>
        <div
          style={{
            margin: "10px 25px",
            width: "300px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              navigate("/update");
            }}
          >
            Update Lokasi
          </button>
          <button
            onClick={() => {
              navigate("/monitoring");
            }}
          >
            Monitoring
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </>
  );
}
