export interface Command {
  execute(): void;
}

export class AddMoodCommand implements Command {
  private moodStorage: import("../services/MoodStorage").MoodStorage;
  private mood: string;

  constructor(
    moodStorage: import("../services/MoodStorage").MoodStorage,
    mood: string
  ) {
    this.moodStorage = moodStorage;
    this.mood = mood;
  }

  execute(): void {
    this.moodStorage.addMood(this.mood);
  }
}
