export function createButton(
  color: string,
  onClick: (moodColor: string) => void
): void {
  const button = document.createElement("button");
  button.className = "button";
  button.style.backgroundColor = color;
  button.style.margin = "0 5px";
  button.style.width = "40px";
  button.style.height = "40px";
  button.style.border = "1px solid #ccc";
  button.style.borderRadius = "8px";
  button.title = color;
  button.onclick = () => onClick(color);
  const container = document.getElementById("buttons-container");
  if (container) {
    container.appendChild(button);
  }
}
