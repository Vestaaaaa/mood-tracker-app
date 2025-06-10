import type { MoodEntry } from "../models/MoodEntry";
import { Singleton } from "../patterns/Singleton";

export class MoodStorage extends Singleton<MoodStorage> {
  private moodEntries: MoodEntry[] = [];

  public constructor() {
    super();
  }

  public static getInstance(): MoodStorage {
    return super.getInstance.call(this);
  }

  public addMood(mood: string): void {
    this.moodEntries.push({ mood, date: new Date() });
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
      ""
    );
  }
}
