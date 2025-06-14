import { BasicMoodSquare, DayNumberDecorator } from "./Decorator";
import type { MoodSquare } from "./Decorator";

export interface DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement;
  getDaysCount(): number;
}

export class MonthDisplayStrategy implements DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement {
    const grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.flexWrap = "wrap";
    grid.style.justifyContent = "center";
    grid.style.width = "340px";

    const daysInMonth = 31;
    const today = new Date();
    const dateStrings: string[] = [];

    for (let i = daysInMonth - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateStrings.push(d.toISOString().slice(0, 10));
    }

    for (let i = 0; i < daysInMonth; i++) {
      const dateStr = dateStrings[i];
      const moodObj = moods.find(
        (m) => m.date.toISOString().slice(0, 10) === dateStr
      );
      const dayMood = moodObj ? moodObj.mood : "white";
      const dayNumber = new Date(dateStr).getDate();

      let square: MoodSquare = new BasicMoodSquare(dayMood);
      square = new DayNumberDecorator(square, dayNumber);

      grid.appendChild(square.render());
    }

    return grid;
  }

  getDaysCount(): number {
    return 31;
  }
}

export class WeekDisplayStrategy implements DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement {
    const grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.justifyContent = "center";
    grid.style.width = "220px";

    const daysInWeek = 7;
    const today = new Date();
    const dateStrings: string[] = [];

    // массив строк с датами последних 7 дней
    for (let i = daysInWeek - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateStrings.push(d.toISOString().slice(0, 10));
    }

    for (let i = 0; i < daysInWeek; i++) {
      const dateStr = dateStrings[i];
      const moodObj = moods.find(
        (m) => m.date.toISOString().slice(0, 10) === dateStr
      );
      const dayMood = moodObj ? moodObj.mood : "white";
      const dayNumber = new Date(dateStr).getDate();

      let square: MoodSquare = new BasicMoodSquare(dayMood);
      square = new DayNumberDecorator(square, dayNumber);

      grid.appendChild(square.render());
    }

    return grid;
  }

  getDaysCount(): number {
    return 7;
  }
}

export class MoodDisplayContext {
  private strategy: DisplayStrategy;

  constructor(strategy: DisplayStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DisplayStrategy): void {
    this.strategy = strategy;
  }

  displayMoods(moods: { mood: string; date: Date }[]): HTMLElement {
    return this.strategy.display(moods);
  }

  getDaysCount(): number {
    return this.strategy.getDaysCount();
  }
}
