const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

// mongoDB url
const mongoString =
  "mongodb://sarveswaran2003:Vinith123@ac-pfxmatu-shard-00-00.5sa17ci.mongodb.net:27017,ac-pfxmatu-shard-00-01.5sa17ci.mongodb.net:27017,ac-pfxmatu-shard-00-02.5sa17ci.mongodb.net:27017/test";

const corsOpts = {
  origin: "*",
  // domain : * means for all

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

// router files
const locationRouter = require("./routes/location");
const restaurentRouter = require("./routes/restaurents");
const mealtypeRouter = require("./routes/mealtypes");

mongoose.connect(
  mongoString +
    "?ssl=true&replicaSet=atlas-cygau2-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const database = mongoose.connection;
mongoose.set("strictQuery", false);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

app.use(cors(corsOpts));

app.use("/api/location", locationRouter);
app.use("/api/restaurent", restaurentRouter);
app.use("/api/mealtype", mealtypeRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .send({ status: 404, message: "API URL Not Found", error: true });
});

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});
