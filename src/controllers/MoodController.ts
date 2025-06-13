//Контроллер, связывающий UI с данными
import { MoodStorage } from "../services/MoodStorage";
import { createButton } from "../components/Button";
import { createMoodGrid } from "../components/MoodGrid";
import { createPopularMoodButton } from "../components/PopularMoodButton";
import { createCalendar } from "../components/Calendar";
import type { Observer } from "../patterns/Observer";

export class MoodController {
  private moodStorage: MoodStorage;
  private backgroundObserver?: Observer;

  constructor(moodStorage: MoodStorage) {
    this.moodStorage = moodStorage;
  }

  public setBackgroundObserver(observer: Observer): void {
    this.backgroundObserver = observer;
  }

  public init(): void {
    this.renderButtons();
    this.renderMoodGrid();
    this.renderPopularMoodButton();
  }

  private renderButtons(): void {
    const colors = ["white", "green", "yellow", "lightblue", "red"];
    colors.forEach((color) => {
      createButton(color, () => this.showCalendarAndAddMood(color));
    });
  }

  public renderMoodGrid(): void {
    const moods = this.moodStorage.getMoods();
    const moodsForGrid = moods.map((entry) => ({
      mood: entry.mood,
      date: new Date(entry.date),
    }));

    const grid = createMoodGrid(moodsForGrid);
    const container = document.getElementById("mood-grid");
    if (container) {
      container.innerHTML = "";
      container.appendChild(grid);
    }
  }

  private renderPopularMoodButton(): void {
    createPopularMoodButton(() => {
      const popular = this.moodStorage.getPopularMood();
      this.renderPopularMoodDisplay();

      if (
        this.backgroundObserver &&
        typeof (this.backgroundObserver as any).update === "function"
      ) {
        (this.backgroundObserver as any).update(popular);
      }
    });
  }

  public renderPopularMoodDisplay(): void {
    const popular = this.moodStorage.getPopularMood();
    const container = document.getElementById("popular-mood");
    if (container) {
      container.innerHTML = `<div style="background-color:${popular};height:50px;width:70px;margin:0 auto;"></div>`;
    }
  }

  private showCalendarAndAddMood(color: string): void {
    const overlay = createCalendar((dateStr) => {
      this.moodStorage.addMood(color, dateStr);
      this.renderMoodGrid();
      this.renderPopularMoodDisplay();
    });

    document.body.appendChild(overlay);
  }
}
