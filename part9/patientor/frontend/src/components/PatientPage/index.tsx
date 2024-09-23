import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EntryDetails from "./EntryDetails";
import AddNewEntry from "./AddNewEntry";
import patients from "../../services/patients";
import axios from "axios";
import { Alert, Typography } from "@mui/material";
import { isHealthCheckEntry, isHospitalEntry, isOccupationalHealthcareEntry } from "../../utils/forValidation";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    fetchPatient();
  }, [id]);

  const genderSign = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <QuestionMarkIcon />;
      default:
        return null;
    }
  };

  const getDiagnosisName = (item: string) => {
    const diagnosis = diagnoses.find((d) => d.code === item);
    return diagnosis ? ` ${diagnosis.name}` : null;
  };

  const validateForm = (values: EntryFormValues) => {
    let errors: { [key: string]: string } = {};
    if (!values.date) {
      errors.date = "Date is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.specialist) {
      errors.specialist = "Specialist is required!";
    }

    if (isHealthCheckEntry(values)) {
      if (values.healthCheckRating === undefined) {
        errors.healthCheckRating = "Health check rating is required!";
      }
    } else if (isHospitalEntry(values)) {
      if (!values.discharge || !values.discharge.date || !values.discharge.criteria) {
        errors.discharge = "Discharge information is required!";
      }
    } else if (isOccupationalHealthcareEntry(values)) {
      if (!values.employerName) {
        errors.employerName = "Employer name is required!";
      }
    }
    return errors;
  };

  const submitNewNntry = async (values: EntryFormValues) => {
    try {
      const validationErrors = validateForm(values);
      setFormErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setIsSubmit(false);
        return;
      }
      const newEntry = await patients.addEntry(id, values);
      setPatient(newEntry);
      setIsSubmit(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          const message = error.response.data.replace("Something went wrong. Error: ", "");
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      {patient ? (
        <div>
          <h2>
            {patient.name} {genderSign(patient.gender)}
          </h2>
          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          {isSubmit && <Alert severity="success">Entry was added</Alert>}
          <AddNewEntry diagnoses={diagnoses} submitNewEntry={submitNewNntry} formErrors={formErrors} />
          <div>
            <h3>Entries</h3>
            {patient.entries.map((item) => (
              <div key={item.id} style={{ paddingBottom: ".5rem" }}>
                <EntryDetails key={item.id} entry={item} />
                <ul>
                  {item.diagnosisCodes?.map((item) => (
                    <li key={item}>
                      {item}
                      {getDiagnosisName(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Typography>Patient not found</Typography>
      )}
    </div>
  );
};

export default PatientPage;
