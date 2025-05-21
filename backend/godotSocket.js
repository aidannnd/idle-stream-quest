const WebSocket = require("ws");

let overlaySocket = null;

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Overlay connected via WebSocket.");
    overlaySocket = ws;

    ws.on("close", () => {
      console.log("Overlay disconnected.");
      overlaySocket = null;
    });

    ws.on("message", (msg) => {
      console.log("Received from overlay:", msg.toString());
    });
  });
}

function sendToOverlay(data) {
  if (overlaySocket && overlaySocket.readyState === WebSocket.OPEN) {
    overlaySocket.send(JSON.stringify(data));
  } else {
    console.log("Overlay not connected. Dropping message:", data);
  }
}

module.exports = { setupWebSocket, sendToOverlay };
