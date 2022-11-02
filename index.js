const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.json("ok");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

const EVERY_15_SECONDS = "*/15 * * * * *";
cron.schedule(EVERY_15_SECONDS, () => {
  const message = faker.hacker.phrase();
  console.log(message);
  io.emit("new message", message);
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
