export function createButton(
  color: string,
  onClick: (moodColor: string) => void
): void {
  const button = document.createElement("button");
  button.className = "button";
  button.style.backgroundColor = color;
  button.onclick = () => onClick(color);
  const container = document.getElementById("buttons-container");
  if (container) {
    container.appendChild(button);
  }
}
