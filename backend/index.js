const express = require("express");
const cors = require("cors");
const http = require("http");
const { setupWebSocket, sendToOverlay } = require("./godotSocket");
const { addPlayer } = require("./state");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// join endpoint simulating Twitch login
app.post("/join", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const success = addPlayer(username);
  if (!success) {
    return res.status(409).json({ error: "Already joined" });
  }

  sendToOverlay({ event: "join", username });
  return res.json({ success: true });
});

// start server
const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
