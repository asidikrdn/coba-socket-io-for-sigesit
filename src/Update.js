import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Update = () => {
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // server
    const newSocket = io("https://sigesit.asidikrdn.my.id/live-tracking/v1", {
      path: "/live-tracking/v1",
    });

    // local
    // const newSocket = io("http://localhost:5000/live-tracking/v1", {
    //   path: "/live-tracking/v1",
    // });
    setSocket(newSocket);

    // tutup socket saat keluar dari komponen
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // disconnect socket saat keluar dari komponen
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("FORM DATA", { id, name, areaId, latitude, longitude });
    // dengan JSON Stringify
    // socket.emit(
    //   "updateLocation",
    //   JSON.stringify({
    //     id: parseInt(id),
    //     fullName: name,
    //     areaId: parseInt(areaId),
    //     latitude: parseFloat(latitude),
    //     longitude: parseFloat(longitude),
    //   })
    // );

    // tanpa JSON Stringify
    socket.emit("updateLocation", {
      id: parseInt(id),
      fullName: name,
      areaId: parseInt(areaId),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    // kosongkan data form
    setId("");
    setName("");
    setAreaId("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }} htmlFor="id">
            ID:
          </label>
          <input
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid gray",
            }}
            type="text"
            id="id"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="name"
          >
            Nama:
          </label>
          <input
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid gray",
            }}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="areaId"
          >
            ID Area:
          </label>
          <input
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid gray",
            }}
            type="text"
            id="areaId"
            value={areaId}
            onChange={(event) => setAreaId(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="latitude"
          >
            Latitude:
          </label>
          <input
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid gray",
            }}
            type="text"
            id="latitude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="longitude"
          >
            Longitude:
          </label>
          <input
            style={{
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid gray",
            }}
            type="text"
            id="longitude"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
          />
        </div>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
