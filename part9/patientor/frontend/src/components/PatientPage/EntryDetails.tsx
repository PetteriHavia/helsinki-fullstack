import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealingIcon from "@mui/icons-material/Healing";
import HealthRating from "./HealthRating";

interface BaseEntryProps {
  icon: JSX.Element;
  entry: Entry;
}

const BaseEntryComponent = ({ icon, entry }: BaseEntryProps) => {
  return (
    <div>
      <p>
        {entry.date} {icon}
      </p>
      <p>{entry.description}</p>
      {entry.type === "HealthCheck" ? <HealthRating rating={entry.healthCheckRating} /> : null}
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return <BaseEntryComponent icon={<LocalHospitalIcon />} entry={entry} />;
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return <BaseEntryComponent icon={<HealingIcon />} entry={entry} />;
};

const OccupationalHealthCareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return <BaseEntryComponent icon={<WorkIcon />} entry={entry} />;
};

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  const assertNever = (entry: never): never => {
    throw new Error(`Unhandled discriminated union member: ${entry}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
