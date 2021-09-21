const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

app.use("/static", express.static("public"));

require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
const io = new require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connectDB = require("./config/db");
connectDB();

const Routes = require("./routes");
app.use("/api", Routes);
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const { handleConnection } = require("./ws/wsHandler");

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Founded",
  });
});

io.on("connection", handleConnection);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
