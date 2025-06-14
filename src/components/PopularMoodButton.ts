export function createPopularMoodButton(onClick: () => void): void {
  const button = document.createElement("button");
  button.innerText = "Most Popular Mood";
  button.style.marginTop = "10px";
  button.id = "popular-mood-btn";
  button.onclick = onClick;
  const existingBtn = document.getElementById("popular-mood-btn");
  if (existingBtn && existingBtn.parentNode) {
    existingBtn.parentNode.removeChild(existingBtn);
  }
  // Вставляем после mood-grid
  const grid = document.getElementById("mood-grid");
  if (grid && grid.parentNode) {
    grid.parentNode.insertBefore(button, grid.nextSibling);
  } else {
    document.body.appendChild(button);
  }
}
