export function createMoodGrid(
  moods: { mood: string; date: Date }[]
): HTMLElement {
  const grid = document.createElement("div");
  grid.id = "mood-grid";
  return grid;
}
