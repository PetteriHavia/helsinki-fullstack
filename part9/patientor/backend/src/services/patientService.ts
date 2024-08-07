import patientData from "../../data/patients";
import { Patient, NonSensitivePatientInfo } from "../../types";

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

export default {
  getPatients,
};
