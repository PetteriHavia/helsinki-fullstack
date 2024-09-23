import patientData from "../../data/patients";
import { Patient, NonSensitivePatientInfo, newPatientEntry, newEntryWithoutId } from "../../types";
import { v4 as uuid } from "uuid";

const patients: Patient[] = patientData;

export const getPatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

export const addedPatient = (newEntries: newPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...newEntries,
  };
  patients.push(newPatient);
  return newPatient;
};

export const getOne = (id: string): Patient | undefined => {
  const findPatient = patients.find((patient) => patient.id === id);
  return findPatient;
};

export const addedEntry = (newEntryObject: newEntryWithoutId, id: string): Patient => {
  const newEntry = {
    id: uuid(),
    ...newEntryObject,
  };
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  addedPatient,
  addedEntry,
  getOne,
};
