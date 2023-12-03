// Load .env variables
require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const testRouter = require("./routes/test");

// get driver connection
// const dbo = require("./db/conn");

const app = express();
const port = process.env.PORT || 8000;

const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/test", testRouter);

server.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);
  // });

  console.log(`Server is running on port: ${port}`);
  // console.log("listening on *:8080");
});
