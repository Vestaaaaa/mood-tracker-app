export function createPopularMoodButton(onClick: () => void): void {
  const button = document.createElement("button");
  button.innerText = "Самое популярное настроение";
  button.onclick = onClick;
  const existingBtn = document.getElementById("popular-mood-btn");
  if (existingBtn && existingBtn.parentNode) {
    existingBtn.parentNode.removeChild(existingBtn);
  }

  button.id = "popular-mood-btn";

  document.body.appendChild(button);
}
