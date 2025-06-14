import type { Observer } from "./Observer";

export class BackgroundColorObserver implements Observer {
  update(data?: any): void {
    if (!data) return;

    const colorMap: Record<string, string> = {
      white: "#ffffff",
      blue: "#ADD8E6",
      red: "#FF7F7F",
      yellow: "#FFFF99",
      lightgreen: "#90EE90",
    };
    let backgroundColor = "#f0f0f0";

    if (colorMap[data.toLowerCase()]) {
      backgroundColor = colorMap[data.toLowerCase()];
    }

    const container = document.getElementById("background-color-container");
    if (container) {
      container.style.backgroundColor = backgroundColor;
    }
    document.body.style.backgroundColor = backgroundColor;
  }
}
