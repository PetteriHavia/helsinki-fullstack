import { Gender, newPatientEntry } from "../types";

export const validateNewEntry = (data: unknown): newPatientEntry => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in data && "dateOfBirth" in data && "ssn" in data && "occupation" in data && "gender" in data) {
    const newEntry = {
      name: checkTypeString(data.name),
      dateOfBirth: checkDateOfBirth(data.dateOfBirth),
      ssn: checkTypeString(data.ssn),
      occupation: checkTypeString(data.occupation),
      gender: checkGender(data.gender),
      entries: [],
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const checkTypeString = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error("Incorrect input:" + input);
  }
  return input;
};

const checkDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect type: date");
  }
  return date;
};

const checkGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect type: gender");
  }
  return gender;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((item) => item.toString())
    .includes(gender);
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default {
  validateNewEntry,
  isString,
  isDate,
};
