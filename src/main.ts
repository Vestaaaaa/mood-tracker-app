import { MoodStorage } from "./services/MoodStorage";
import { MoodController } from "./controllers/MoodController";
import { BackgroundColorObserver } from "./patterns/BackgroundColorObserver";
import { CommandManager } from "./patterns/CommandManager";
import { IdleState, AppContext } from "./patterns/State";

// Singleton
const moodStorage = MoodStorage.getInstance();
const commandManager = new CommandManager();
const appContext = new AppContext(new IdleState());

// Observer
const backgroundObserver = new BackgroundColorObserver();

// MoodController
const moodController = new MoodController(
  moodStorage,
  commandManager,
  appContext
);

// Подписка Observer-а
moodController.setBackgroundObserver(backgroundObserver);

const undoBtn = document.getElementById("undo-btn");
if (undoBtn instanceof HTMLButtonElement) {
  undoBtn.addEventListener("click", () => {
    commandManager.undo();
    moodController.renderMoodGrid();
    moodController.renderPopularMoodDisplay();
    undoBtn.disabled = !commandManager.canUndo();
  });
  undoBtn.disabled = !commandManager.canUndo();
}

moodController.init();
