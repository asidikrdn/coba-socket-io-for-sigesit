import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Monitoring = () => {
  const [locations, setLocations] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://128.199.237.114:5000/live-tracking/v1',{
      path:"/live-tracking/v1"
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('technicianLocation', (loc) => {
      setLocations(loc);
    });

    return () => {
      socket.off('technicianLocation');
    };
  }, [socket]);

  console.log(locations);

  return <>Hehe</>;
};

export default Monitoring;
