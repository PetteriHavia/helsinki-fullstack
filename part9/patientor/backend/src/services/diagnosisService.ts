import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../../types";

const diagnosis: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnoses,
};
