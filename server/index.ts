import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieparser from 'cookie-parser'
import userRouter from "./routes/user.route";
import studyRouter from "./routes/study.route";
import prepRouter from "./routes/prep.route";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieparser());

app.use(cors({
  credentials: true
}));

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/study', studyRouter);
app.use('/api/v1/prep', prepRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
})
