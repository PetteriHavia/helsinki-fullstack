import { DiaryEntry } from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

const EntryCard = ({ entry }: EntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </div>
  );
};

export default EntryCard;
