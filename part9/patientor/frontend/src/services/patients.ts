import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getOne = async (id: string | undefined) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const addEntry = async (id: string | undefined, object: EntryFormValues) => {
  const response = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return response.data;
};

export default {
  getAll,
  create,
  getOne,
  addEntry,
};
