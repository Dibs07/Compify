import express from "express";
import mongoose from "mongoose";
import config from "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";

// config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Request got by Status Code 202.");
});
app.use(express.json());
app.use(cors({
  origin : "*",
}));

const mongooseUri = process.env.MONGO_URI || "default_fallback_uri";
const port = process.env.PORT || 5000;
mongoose
  .connect(mongooseUri, {
    ssl: true,
    minPoolSize: 1,
    maxPoolSize: 1,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Your Server is running" + " " + port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });