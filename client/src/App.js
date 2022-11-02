import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("new message", (message) => {
      setMessage(message);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "2em" }}>
          {isConnected ? "Online" : "Offline"}
        </span>
        <div
          style={{
            backgroundColor: isConnected ? "green" : "red",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
