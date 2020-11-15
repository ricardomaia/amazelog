const express = require("express");
const path = require("path");
const socketIo = require("socket.io");
var compression = require("compression");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = express();
const server = require("http").createServer(app);
app.use(compression());
const io = socketIo(server);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("read", () => {
    console.log("reading file");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Answer API requests.
app.get("/api", function (req, res) {
  res.set("Content-Type", "application/json");
  res.send("Server is running.");
});

server.listen(PORT, function () {
  console.error(
    `Node ${
      isDev ? "dev server" : "cluster worker " + process.pid
    }: listening on port ${PORT}`
  );
});
