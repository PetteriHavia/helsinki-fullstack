import express, { Response, Request } from "express";
import patientService from "../services/patientService";
import validateNewEntry from "../../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = validateNewEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedPatient = patientService.addedPatient(newPatientEntry);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.send(errorMessage);
  }
});

export default router;
