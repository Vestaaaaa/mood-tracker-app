export function createPopularMoodButton(onClick: () => void): void {
  const button = document.createElement("button");
  button.innerText = "Самое популярное настроение";
  button.onclick = onClick;
  document.body.appendChild(button);
}
