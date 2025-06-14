export interface MoodSquare {
  render(): HTMLElement;
}

export class BasicMoodSquare implements MoodSquare {
  private color: string;

  constructor(color: string) {
    this.color = color;
  }

  render(): HTMLElement {
    const square = document.createElement("div");
    square.style.position = "relative";
    square.style.backgroundColor = this.color;
    square.style.width = "30px";
    square.style.height = "30px";
    square.style.margin = "1px";
    square.style.borderRadius = "6px";
    return square;
  }
}

export abstract class MoodSquareDecorator implements MoodSquare {
  protected component: MoodSquare;

  constructor(component: MoodSquare) {
    this.component = component;
  }

  render(): HTMLElement {
    return this.component.render();
  }
}

export class DayNumberDecorator extends MoodSquareDecorator {
  private dayNumber: number;

  constructor(component: MoodSquare, dayNumber: number) {
    super(component);
    this.dayNumber = dayNumber;
  }

  render(): HTMLElement {
    const square = super.render();
    const dayLabel = document.createElement("span");
    dayLabel.textContent = this.dayNumber.toString();
    dayLabel.style.position = "absolute";
    dayLabel.style.top = "2px";
    dayLabel.style.right = "4px";
    dayLabel.style.fontSize = "12px";
    dayLabel.style.color = "#333";
    dayLabel.style.fontWeight = "600";
    dayLabel.style.userSelect = "none";
    dayLabel.style.pointerEvents = "none";

    square.appendChild(dayLabel);
    return square;
  }
}
