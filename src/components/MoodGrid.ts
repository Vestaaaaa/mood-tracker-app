export function createMoodGrid(
  moods: { mood: string; date: Date }[]
): HTMLElement {
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
