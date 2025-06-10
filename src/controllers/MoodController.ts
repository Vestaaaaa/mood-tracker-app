import { MoodStorage } from "../services/MoodStorage";
import { createButton } from "../components/Button";
import { createMoodGrid } from "../components/MoodGrid";
import { createPopularMoodButton } from "../components/PopularMoodButton";

export class MoodController {
  private moodStorage: MoodStorage;

  constructor(moodStorage: MoodStorage) {
    this.moodStorage = moodStorage;
  }

  public init(): void {
    this.renderButtons();
    this.renderMoodGrid();
    this.renderPopularMoodButton();
  }

  private renderButtons(): void {
    const colors = ["white", "green", "yellow", "lightblue", "red"];
    colors.forEach((color) => {
      createButton(color, (moodColor) => {
        this.moodStorage.addMood(moodColor);
        this.renderMoodGrid();
      });
    });
  }

  private renderMoodGrid(): void {
    const moodGrid = createMoodGrid(this.moodStorage.getMoods());
    const moodGridContainer = document.getElementById("mood-grid");
    if (moodGridContainer) {
      moodGridContainer.innerHTML = "";
      moodGridContainer.appendChild(moodGrid);
    }
  }

  private renderPopularMoodButton(): void {
    createPopularMoodButton(() => {
      const popularMood = this.moodStorage.getPopularMood();
      const popularMoodContainer = document.getElementById("popular-mood");
      if (popularMoodContainer) {
        popularMoodContainer.innerHTML = `<div style="background-color:${popularMood};height:50px;width:70px;margin:0 auto;"></div>`;
      }
    });
  }
}
