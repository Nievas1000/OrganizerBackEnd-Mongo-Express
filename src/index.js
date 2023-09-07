const express = require("express");
const app = express();
const cors = require("cors");
const connectMongo = require("./db");

app.use(cors());
app.use(express.json());

connectMongo();
const projectRoute = require("./routes/project");
const taskRoute = require("./routes/task");

app.use("/", projectRoute);
app.use("/", taskRoute);

app.listen(3001, () => {
  console.log("Server run on port " + 3001);
});
