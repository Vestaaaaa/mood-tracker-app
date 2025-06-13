import type { Observer } from "./Observer";

export class BackgroundColorObserver implements Observer {
  update(data?: any): void {
    if (!data) return;

    const colorMap: Record<string, string> = {
      blue: "#ADD8E6",
      red: "#FF7F7F",
      yellow: "#FFFF99",
      green: "#90EE90",
    };
    let backgroundColor = "#f0f0f0";

    switch (data.toLowerCase()) {
      case "blue":
        backgroundColor = colorMap.blue;
        break;
      case "red":
        backgroundColor = colorMap.red;
        break;
      case "yellow":
        backgroundColor = colorMap.yellow;
        break;
      case "green":
        backgroundColor = colorMap.green;
        break;
      default:
        backgroundColor = "#f0f0f0";
        break;
    }

    const container = document.getElementById("background-color-container");
    if (container) {
      container.style.backgroundColor = backgroundColor;

      document.body.style.backgroundColor = backgroundColor;
    }
  }
}
