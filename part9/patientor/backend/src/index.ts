import express from "express";
import cors from "cors";
import diagnosisService from "../src/routes/diagnosis";
import patientService from "../src/routes/patient";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosisService);
app.use("/api/patients", patientService);

app.get("/api/ping", (_reg, res) => {
  res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
