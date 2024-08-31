import { useState } from "react";
import { DiaryEntry } from "../types";
import diaryService from "../services/diaryService";
import axios from "axios";

interface Props {
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  entries: DiaryEntry[];
}

const AddEntry = ({ setEntries, entries }: Props) => {
  const [error, setError] = useState("");
  const [newEntry, setNewEntry] = useState({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    setNewEntry((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const addNewEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const entryObject = {
        date: newEntry.date,
        visibility: newEntry.visibility,
        weather: newEntry.weather,
        comment: newEntry.comment,
      };

      const newDiaryEntry = await diaryService.create(entryObject);
      setEntries([...entries, newDiaryEntry]);
      setError("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occured.");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={addNewEntry}>
        {error ? error : null}
        <h2>Add new entry</h2>
        <div className="box">
          <label>Date</label>
          <input name="date" value={newEntry.date} type="date" onChange={handleChange} />
        </div>
        <div className="box">
          <label>Visibility</label>
          <input name="visibility" value="great" type="radio" onChange={handleChange} id="great" />
          <label htmlFor="great">Great</label>
          <input name="visibility" value="good" type="radio" onChange={handleChange} id="good" />
          <label htmlFor="good">Good</label>
          <input name="visibility" value="ok" type="radio" onChange={handleChange} id="ok" />
          <label htmlFor="ok">Ok</label>
          <input name="visibility" value="poor" type="radio" onChange={handleChange} id="poor" />
          <label htmlFor="poor">Poor</label>
        </div>
        <div className="box">
          <label>Weather</label>
          <input name="weather" value="sunny" type="radio" onChange={handleChange} id="sunny" />
          <label htmlFor="sunny">Sunny</label>
          <input name="weather" value="rainy" type="radio" onChange={handleChange} id="rainy" />
          <label htmlFor="rainy">Rainy</label>
          <input name="weather" value="cloudy" type="radio" onChange={handleChange} id="cloudy" />
          <label htmlFor="cloudy">Cloudy</label>
          <input name="weather" value="windy" type="radio" onChange={handleChange} id="windy" />
          <label htmlFor="windy">Windy</label>
        </div>
        <div className="box">
          <label>Comment</label>
          <input name="comment" value={newEntry.comment} type="text" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEntry;
