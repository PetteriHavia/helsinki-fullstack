import { useEffect, useState } from "react";
import EntryList from "./components/EntryList";
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";
import AddEntry from "./components/AddEntry";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllEntries().then((response) => {
      setEntries(response.data);
    });
  }, []);

  return (
    <div>
      <AddEntry setEntries={setEntries} entries={entries} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;
