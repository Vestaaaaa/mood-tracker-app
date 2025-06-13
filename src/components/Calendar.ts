export function createCalendar(
  onDateSelected: (dateStr: string) => void
): HTMLElement {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";

  const calendarBox = document.createElement("div");
  calendarBox.style.backgroundColor = "#fff";
  calendarBox.style.padding = "20px";
  calendarBox.style.borderRadius = "8px";

  //input для ввода даты
  const dateInput = document.createElement("input");
  dateInput.type = "date";

  // Кнопка подтверждения
  const confirmBtn = document.createElement("button");
  confirmBtn.innerText = "Выбрать дату";

  confirmBtn.onclick = () => {
    if (dateInput.value) {
      onDateSelected(dateInput.value);
      document.body.removeChild(overlay);
    } else {
      alert("Пожалуйста, выберите дату");
    }
  };

  // Кнопка отмены
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Отмена";
  cancelBtn.onclick = () => {
    document.body.removeChild(overlay);
  };

  calendarBox.appendChild(document.createTextNode("Выберите дату: "));
  calendarBox.appendChild(dateInput);

  const btnContainer = document.createElement("div");

  btnContainer.appendChild(confirmBtn);

  const spacer = document.createTextNode(" ");

  btnContainer.appendChild(spacer);

  btnContainer.appendChild(cancelBtn);

  calendarBox.appendChild(btnContainer);

  overlay.appendChild(calendarBox);

  return overlay;
}
