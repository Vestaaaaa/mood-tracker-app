//Контроллер, связывающий UI с данными
import { MoodStorage } from "../services/MoodStorage";
import { createButton } from "../components/Button";
import { createPopularMoodButton } from "../components/PopularMoodButton";
import { createCalendar } from "../components/Calendar";
import type { Observer } from "../patterns/Observer";
import { CommandManager } from "../patterns/CommandManager";
import { AddMoodCommand } from "../patterns/Command";
import type { AppContext } from "../patterns/State";
import {
  MonthDisplayStrategy,
  WeekDisplayStrategy,
  MoodDisplayContext,
} from "../patterns/Strategy";
import { LoadingState, IdleState } from "../patterns/State";

export class MoodController {
  private moodStorage: MoodStorage;
  private backgroundObserver?: Observer;
  private commandManager: CommandManager;
  private appContext: AppContext;
  private displayContext: MoodDisplayContext;

  private currentDisplayMode: "week" | "month" = "month";

  constructor(
    moodStorage: MoodStorage,
    commandManager: CommandManager,
    appContext: AppContext
  ) {
    this.moodStorage = moodStorage;
    this.commandManager = commandManager;
    this.appContext = appContext;
    this.displayContext = new MoodDisplayContext(new MonthDisplayStrategy());
  }

  public setBackgroundObserver(observer: Observer): void {
    this.backgroundObserver = observer;
  }

  public init(): void {
    this.renderMoodGrid();
    this.renderRightPanel();
  }

  public renderMoodGrid(): void {
    const moods = this.moodStorage
      .getMoods()
      .map((entry) => ({
        mood: entry.mood,
        date: new Date(entry.date),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const container = this.getOrCreateLeftPanel();
    container.innerHTML = "";
    const displayElement = this.displayContext.displayMoods(moods);
    container.appendChild(displayElement);
  }

  // всё управление в правую панель
  private renderRightPanel(): void {
    const container = this.getOrCreateRightPanel();
    container.innerHTML = "";

    // кнопки настроения
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";
    const colors = ["white", "lightgreen", "yellow", "blue", "red"];
    colors.forEach((color) => {
      createButton(color, () => this.showCalendarAndAddMood(color));
    });
    container.appendChild(buttonsContainer);

    // "Месяц"/"Неделя"
    const displayModeContainer = document.createElement("div");
    displayModeContainer.id = "display-mode-buttons";
    displayModeContainer.style.margin = "10px 0";
    const monthBtn = document.createElement("button");
    monthBtn.innerText = "Month";
    monthBtn.onclick = () => {
      this.displayContext.setStrategy(new MonthDisplayStrategy());
      this.currentDisplayMode = "month";
      this.updateDisplayModeButtonsHighlight();
      this.renderMoodGrid();
    };
    const weekBtn = document.createElement("button");
    weekBtn.innerText = "Week";
    weekBtn.onclick = () => {
      this.displayContext.setStrategy(new WeekDisplayStrategy());
      this.currentDisplayMode = "week";
      this.updateDisplayModeButtonsHighlight();
      this.renderMoodGrid();
    };
    displayModeContainer.appendChild(monthBtn);
    displayModeContainer.appendChild(weekBtn);
    container.appendChild(displayModeContainer);
    this.updateDisplayModeButtonsHighlight();

    // Кнопка Undo
    let undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
    if (!undoBtn) {
      undoBtn = document.createElement("button");
      undoBtn.id = "undo-btn";
      undoBtn.innerText = "Undo";
    }
    undoBtn.onclick = () => {
      this.commandManager.undo();
      this.renderMoodGrid();
      this.renderPopularMoodDisplay();
      undoBtn.disabled = !this.commandManager.canUndo();
    };
    undoBtn.disabled = !this.commandManager.canUndo();
    container.appendChild(undoBtn);

    // Кнопка "Самое популярное настроение"
    const oldPopularBtn = document.getElementById("popular-mood-btn");
    if (oldPopularBtn && oldPopularBtn.parentNode) {
      oldPopularBtn.parentNode.removeChild(oldPopularBtn);
    }
    createPopularMoodButton(async () => {
      this.appContext.setState(new LoadingState());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const popular = this.moodStorage.getPopularMood();
      if (
        this.backgroundObserver &&
        typeof (this.backgroundObserver as any).update === "function"
      ) {
        (this.backgroundObserver as any).update(popular);
      }
      this.appContext.setState(new IdleState());
      this.renderPopularMoodDisplay();
    });
    const newPopularBtn = document.getElementById("popular-mood-btn");
    if (newPopularBtn) container.appendChild(newPopularBtn);

    // Популярное настроение
    let popularMoodDiv = document.getElementById("popular-mood");
    if (!popularMoodDiv) {
      popularMoodDiv = document.createElement("div");
      popularMoodDiv.id = "popular-mood";
    }
    container.appendChild(popularMoodDiv);
    this.renderPopularMoodDisplay();
  }

  private updateDisplayModeButtonsHighlight(): void {
    const container = document.getElementById("display-mode-buttons");
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (
        (btn.innerText === "Месяц" && this.currentDisplayMode === "month") ||
        (btn.innerText === "Неделя" && this.currentDisplayMode === "week")
      ) {
        btn.style.backgroundColor = "#4a90e2";
        btn.style.color = "#fff";
        btn.style.fontWeight = "700";
      } else {
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.style.fontWeight = "";
      }
    });
  }

  public renderPopularMoodDisplay(): void {
    const popular = this.moodStorage.getPopularMood();
    const container = document.getElementById("popular-mood");
    if (container) {
      container.innerHTML = `<div style="background-color:${popular};height:50px;width:70px;margin:0 auto;border:1px solid #ccc;display:flex;align-items:center;justify-content:center;">${popular}</div>`;
    }
  }

  private showCalendarAndAddMood(color: string): void {
    const overlay = createCalendar((dateStr) => {
      const daysCount = this.displayContext.getDaysCount();
      const moods = this.moodStorage.getMoods();

      const uniqueDates = new Set(moods.map((m) => m.date));

      if (uniqueDates.size >= daysCount) {
        this.moodStorage.clearMoods();
        this.commandManager.clear();
      }

      const addMoodCmd = new AddMoodCommand(this.moodStorage, color, dateStr);
      this.commandManager.executeCommand(addMoodCmd);

      this.renderMoodGrid();
      this.renderPopularMoodDisplay();

      const undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
      if (undoBtn) {
        undoBtn.disabled = !this.commandManager.canUndo();
      }
    });

    document.body.appendChild(overlay);
  }

  //Панели
  private getOrCreateLeftPanel(): HTMLElement {
    let leftPanel = document.getElementById("left-panel");
    if (!leftPanel) {
      const containerPanels = document.getElementById("container-panels");
      if (!containerPanels) throw new Error("container-panels not found");
      leftPanel = document.createElement("div");
      leftPanel.id = "left-panel";
      leftPanel.style.flex = "1";
      containerPanels.appendChild(leftPanel);
    }
    return leftPanel;
  }

  private getOrCreateRightPanel(): HTMLElement {
    let rightPanel = document.getElementById("right-panel");
    if (!rightPanel) {
      const containerPanels = document.getElementById("container-panels");
      if (!containerPanels) throw new Error("container-panels not found");
      rightPanel = document.createElement("div");
      rightPanel.id = "right-panel";
      rightPanel.style.flex = "1";
      rightPanel.style.display = "flex";
      rightPanel.style.flexDirection = "column";
      rightPanel.style.gap = "15px";
      containerPanels.appendChild(rightPanel);
    }
    return rightPanel;
  }
}
