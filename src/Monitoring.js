import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Monitoring = () => {
  const [locations, setLocations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [area, setArea] = useState([]);
  const [idUser, setIdUser] = useState();

  const getArea = async () => {
    let response = await fetch("https://sigesit.asidikrdn.my.id/api/v1/area");
    let responseJSON = await response.json();

    // console.log("RESPONSE AREA", responseJSON.data);

    if (response.status === 200) {
      setArea(responseJSON.data);
    }
  };

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

    // ambil data area
    getArea();

    // tutup socket saat keluar dari komponen
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("currentLocations", (loc) => {
      setLocations(loc);
    });
    socket.on("technicianLocation", (loc) => {
      setLocations(loc);
    });

    // berhenti listen dari 2 event, lalu disconnect socket saat keluar dari komponen
    return () => {
      socket.off("technicianLocation");
      socket.off("currentLocations");
      socket.disconnect();
    };
  }, [socket]);

  // console.log(locations);
  // console.log("idUser", idUser);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Monitoring Seluruh Data</h1>
      <table border="1" width={"75%"} style={{ margin: "auto" }}>
        <tr>
          <th>ID User</th>
          <th>Nama</th>
          <th>ID Area</th>
          <th>Area</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
        {locations?.map((el) => {
          return (
            el.id !== undefined &&
            el.id !== null && (
              <tr>
                <td>{el.id}</td>
                <td>{el.fullName}</td>
                <td>{el.areaId}</td>
                <td>
                  {area?.map((loc) => {
                    return loc.id === el.areaId && <p>{loc.name}</p>;
                  })}
                </td>
                <td>{el.latitude}</td>
                <td>{el.longitude}</td>
              </tr>
            )
          );
        })}
      </table>

      <hr style={{ marginTop: "50px" }} />
      <h1 style={{ textAlign: "center" }}>Monitoring Data Tertentu</h1>
      <p style={{ marginLeft: "15px" }}>
        Masukkan id user yang ingin ditampilkan :
      </p>
      <input
        style={{ marginLeft: "15px" }}
        type="text"
        value={idUser}
        onChange={(el) => {
          setIdUser(el.target.value);
        }}
      />
      <h3 style={{ marginLeft: "15px" }}>ID User = {idUser}</h3>

      <table border="1" width={"75%"} style={{ margin: "auto" }}>
        <tr>
          <th>ID User</th>
          <th>Nama</th>
          <th>ID Area</th>
          <th>Area</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
        {locations
          ?.filter((el) => {
            return el.id === parseInt(idUser); // iduser pada penerapannya bisa diganti menggunakan idTeknisi yang didapatkan dari detail task
          })
          .map((el) => {
            return (
              el.id !== undefined &&
              el.id !== null && (
                <tr>
                  <td>{el.id}</td>
                  <td>{el.fullName}</td>
                  <td>{el.areaId}</td>
                  <td>
                    {area?.map((loc) => {
                      return loc.id === el.areaId && <p>{loc.name}</p>;
                    })}
                  </td>
                  <td>{el.latitude}</td>
                  <td>{el.longitude}</td>
                </tr>
              )
            );
          })}
      </table>
    </>
  );
};

export default Monitoring;
