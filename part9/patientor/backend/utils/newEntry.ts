import { isDate } from "./newPatient";
import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
  Diagnosis,
  BaseEntry,
} from "../types";
import { isString } from "./newPatient";

export const toEntry = (entry: unknown): Entry => {
  const baseEntry = validatebaseEntry(entry);
  switch ((baseEntry as Entry).type) {
    case "HealthCheck":
      return parseHealthCheckEntry(entry as HealthCheckEntry);
    case "OccupationalHealthcare":
      return parseOccupationalHealthCareEntry(entry as OccupationalHealthcareEntry);
    case "Hospital":
      return parseHospitalEntry(entry as HospitalEntry);
    default:
      throw new Error("Invalid entry type");
  }
};

const validatebaseEntry = (entry: unknown): BaseEntry => {
  if (!entry || !isObject(entry) || entry === undefined) {
    throw new Error("Incorrect input: " + entry);
  }

  const baseEntry = entry as BaseEntry;

  if (!isString(baseEntry.date) || !isDate(baseEntry.date)) {
    throw new Error("Invalid or missing date");
  }
  if (!isString(baseEntry.description) || !baseEntry.description) {
    throw new Error("Invalid or missing date");
  }
  if (!isString(baseEntry.specialist)) {
    throw new Error("Invalid or missing specialist");
  }
  parseDiagnosisCodes(baseEntry.diagnosisCodes);
  return baseEntry;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHospitalEntry = (entry: HospitalEntry): HospitalEntry => {
  if (!entry.discharge || !isObject(entry.discharge)) {
    throw new Error("Invalid type: discharge");
  }
  if (!isString(entry.discharge.criteria) || !isDate(entry.discharge.date)) {
    throw new Error("Invalid type: discharge fields");
  }
  return entry;
};

const parseHealthCheckEntry = (entry: HealthCheckEntry): HealthCheckEntry => {
  if (!isRating(entry.healthCheckRating)) {
    throw new Error("Invalid type: healthCheckRating");
  }
  return entry;
};

const parseOccupationalHealthCareEntry = (entry: OccupationalHealthcareEntry): OccupationalHealthcareEntry => {
  if (!entry.employerName || !isString(entry.employerName)) {
    throw new Error("Invalid type: employer name");
  }
  if (entry.sickLeave) {
    if (!isString(entry.sickLeave.startDate || entry.sickLeave.endDate))
      throw new Error("Invalid type: sickLeave dates");
  }
  return entry;
};

const isRating = (rate: number): rate is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rate);
};

const isObject = (object: unknown): object is object => {
  return typeof object === "object";
};

export default toEntry;
