import patientData from "../../data/patients";
import { Patient, NonSensitivePatientInfo, newPatientEntry } from "../../types";
import { v4 as uuid } from "uuid";

const patients: Patient[] = patientData;

export const getPatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addedPatient = (entries: newPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entries,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addedPatient,
};
