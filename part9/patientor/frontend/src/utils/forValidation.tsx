import { EntryFormValues, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

export const isHealthCheckEntry = (entry: EntryFormValues): entry is HealthCheckEntry => {
  return entry.type === "HealthCheck";
};

export const isOccupationalHealthcareEntry = (entry: EntryFormValues): entry is OccupationalHealthcareEntry => {
  return entry.type === "OccupationalHealthcare";
};

export const isHospitalEntry = (entry: EntryFormValues): entry is HospitalEntry => {
  return entry.type === "Hospital";
};

export default {
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
};
