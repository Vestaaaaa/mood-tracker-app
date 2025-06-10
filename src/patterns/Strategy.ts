export interface DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement;
}

export class GridDisplayStrategy implements DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement {
    const grid = document.createElement("div");
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const dayMood = moods[i]?.mood || "white";
      const square = document.createElement("div");
      square.style.backgroundColor = dayMood;
      square.style.width = "30px";
      square.style.height = "30px";
      square.style.display = "inline-block";
      grid.appendChild(square);
    }
    return grid;
  }
}

export class ListDisplayStrategy implements DisplayStrategy {
  display(moods: { mood: string; date: Date }[]): HTMLElement {
    const list = document.createElement("ul");
    moods.forEach((entry) => {
      const item = document.createElement("li");
      item.innerText = `${entry.date.toDateString()}: ${entry.mood}`;
      list.appendChild(item);
    });
    return list;
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
}
