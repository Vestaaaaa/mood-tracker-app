export interface Command {
  execute(): void;
  undo?(): void;
}

export class AddMoodCommand implements Command {
  private moodStorage: import("../services/MoodStorage").MoodStorage;
  private mood: string;
  private dateStr: string;

  constructor(
    moodStorage: import("../services/MoodStorage").MoodStorage,
    mood: string,
    dateStr: string
  ) {
    this.moodStorage = moodStorage;
    this.mood = mood;
    this.dateStr = dateStr;
  }

  execute(): void {
    this.moodStorage.addMood(this.mood, this.dateStr);
  }

  undo(): void {
    this.moodStorage.removeMood(this.mood, this.dateStr);
  }
}
