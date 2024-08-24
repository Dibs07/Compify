import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// config();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: "*",
}));

app.use('/api/v1/auth', userRouter);
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
})