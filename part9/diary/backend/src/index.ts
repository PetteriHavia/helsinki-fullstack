import express from "express";
import diaryRouter from "./routes/diaries";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (_reg, res) => {
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
