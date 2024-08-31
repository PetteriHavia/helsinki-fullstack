import { DiaryEntry } from "../types";
import EntryCard from "./EntryCard";

interface EntriesProps {
  entries: DiaryEntry[];
}

const EntryList = ({ entries }: EntriesProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryList;
