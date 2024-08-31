export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string; //comment is now optional
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
