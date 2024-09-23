import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, HealthCheckRating, EntryFormValues } from "../../types";

interface HealthRatingOptions {
  value: HealthCheckRating;
  label: string;
}

interface Props {
  diagnoses: Diagnosis[];
  submitNewEntry: (values: EntryFormValues) => void;
  formErrors: { [key: string]: string };
}

interface FormState {
  type: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: number;
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  discharge: {
    date: string;
    criteria: string;
  };
}

const AddNewEntry = ({ diagnoses, submitNewEntry, formErrors }: Props) => {
  const [form, setForm] = useState<FormState>({
    type: "",
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
    healthCheckRating: 0,
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
    discharge: { date: "", criteria: "" },
  });

  const healthRatingOptions: HealthRatingOptions[] = Object.values(HealthCheckRating)
    .filter((v) => typeof v === "number")
    .map((v) => ({
      value: v as HealthCheckRating,
      label: HealthCheckRating[v as HealthCheckRating],
    }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      employerName,
      sickLeave,
      discharge,
      type,
    } = form;
    switch (type) {
      case "HealthCheck":
        return submitNewEntry({ description, date, specialist, diagnosisCodes, healthCheckRating, type });
      case "Hospital":
        return submitNewEntry({ description, date, specialist, diagnosisCodes, discharge, type });
      case "OccupationalHealthcare":
        return submitNewEntry({ description, date, specialist, diagnosisCodes, sickLeave, type, employerName });
      default:
        throw new Error("Unknown entry type");
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <h3>New {form.type} entry</h3>
      <FormControl fullWidth style={{ gap: "1rem" }}>
        {formErrors.type && <Alert severity="error">{formErrors.type}</Alert>}
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          label="Type"
          name="type"
          value={form.type}
          onChange={({ target }) => setForm({ ...form, type: target.value })}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
        {formErrors.description && <Alert severity="error">{formErrors.description}</Alert>}
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
        {formErrors.date && <Alert severity="error">{formErrors.date}</Alert>}
        <TextField
          label="Date"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        {formErrors.specialist && <Alert severity="error">{formErrors.specialist}</Alert>}
        <TextField label="Specialist" name="specialist" value={form.specialist} onChange={handleChange} />
        <FormControl>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            label="Diagnosis codes"
            name="diagnosisCodes"
            multiple
            value={form.diagnosisCodes}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                diagnosisCodes: e.target.value as string[],
              }))
            }
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {form.type === "HealthCheck" && (
          <>
            <FormControl>
              {formErrors.healthCheckRating && <Alert severity="error">{formErrors.healthCheckRating}</Alert>}
              <FormLabel>Health Rating</FormLabel>
              <RadioGroup
                row
                defaultValue="0"
                name="healthCheckRating"
                onChange={({ target }) => setForm((prev) => ({ ...prev, healthCheckRating: parseInt(target.value) }))}
              >
                {healthRatingOptions.map((option) => (
                  <FormControlLabel key={option.label} value={option.value} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
        {form.type === "Hospital" && (
          <>
            <Typography>Discharge Information:</Typography>
            {formErrors.discharge && <Alert severity="error">{formErrors.discharge}</Alert>}
            <TextField
              type="date"
              label="Date"
              value={form.discharge.date}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) => setForm((prev) => ({ ...prev, discharge: { ...prev.discharge, date: e.target.value } }))}
            />
            <TextField
              label="Discharge criteria"
              name="criteria"
              value={form.discharge.criteria}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, discharge: { ...prev.discharge, criteria: e.target.value } }))
              }
            />
          </>
        )}
        {form.type === "OccupationalHealthcare" && (
          <>
            {formErrors.employerName && <Alert severity="error">{formErrors.employerName}</Alert>}
            <TextField
              label="Employer Name"
              name="employerName"
              value={form.employerName}
              onChange={handleChange}
            ></TextField>
            <Typography>Sickleave Information:</Typography>
            <TextField
              type="date"
              label="Start date"
              value={form.sickLeave.startDate}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sickLeave: { ...prev.sickLeave, startDate: e.target.value } }))
              }
            />
            <TextField
              type="date"
              label="End date"
              value={form.sickLeave.endDate}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sickLeave: { ...prev.sickLeave, endDate: e.target.value } }))
              }
            />
          </>
        )}
        <Button style={{ maxWidth: "120px" }} type="submit" variant="contained">
          Add Entry
        </Button>
      </FormControl>
    </form>
  );
};

export default AddNewEntry;
