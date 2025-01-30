import React, { useEffect } from "react";
import socket from "../../socket";

const SocketComponent = () => {
  useEffect(() => {
    socket.connect();

    socket.on("message", (data) => {
      console.log("Nachricht vom Server:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", { text: "Hallo Server!" });
  };

  return (
    <div>
      <h1>Socket.IO Frontend</h1>
      <button onClick={sendMessage}>Nachricht senden</button>
    </div>
  );
};

export default SocketComponent;
