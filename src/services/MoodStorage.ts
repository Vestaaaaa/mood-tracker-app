//Реализует хранилище данных о настроениях как Singleton
import type { MoodEntry } from "../models/MoodEntry";
import { Singleton } from "../patterns/Singleton";

export class MoodStorage extends Singleton<MoodStorage> {
  private moodEntries: MoodEntry[] = [];

  public constructor() {
    super();
    const dataStr = localStorage.getItem("moodEntries");
    if (dataStr) {
      this.moodEntries = JSON.parse(dataStr);
    }
  }

  public static getInstance(): MoodStorage {
    return super.getInstance.call(this);
  }

  private saveToLocal() {
    localStorage.setItem("moodEntries", JSON.stringify(this.moodEntries));
  }

  public addMood(mood: string, date: string): void {
    this.moodEntries.push({ mood, date });
    this.saveToLocal();
  }

  public getMoods(): MoodEntry[] {
    return this.moodEntries;
  }

  public getPopularMood(): string {
    const counts: { [mood: string]: number } = {};
    this.moodEntries.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });
    return Object.keys(counts).reduce(
      (a, b) => (counts[a] > counts[b] ? a : b),
      "white"
    );
  }
}
