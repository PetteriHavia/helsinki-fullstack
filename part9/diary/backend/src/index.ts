import express from "express";
import diaryRouter from "./routes/diaries";

const app = express();
app.use(express.json());

app.get("/ping", (_reg, res) => {
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
