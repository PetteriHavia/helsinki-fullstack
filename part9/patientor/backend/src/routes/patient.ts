import express, { Response, Request } from "express";
import patientService from "../services/patientService";
import { validateNewEntry } from "../../utils/newPatient";
import toEntry from "../../utils/newEntry";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getOne(req.params.id);
  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
  }
  res.status(201).json(patient);
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

router.post("/:id/entries", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ error: "Trying to add entry to a patient that does not exist" });
    }
    const newEntry = toEntry(req.body);
    const addedEntry = patientService.addedEntry(newEntry, id);
    console.log(addedEntry);
    return res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
    if (error instanceof Error) {
      errorMessage += "Errror: " + error.message;
    }
    return res.send(errorMessage);
  }
});

export default router;
