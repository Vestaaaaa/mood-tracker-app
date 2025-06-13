import { MoodStorage } from "./services/MoodStorage";
import { MoodController } from "./controllers/MoodController";
import { BackgroundColorObserver } from "./patterns/BackgroundColorObserver";
import { createCalendar } from "./components/Calendar";

const moodStorage = MoodStorage.getInstance();
const moodController = new MoodController(moodStorage);

const backgroundObserver = new BackgroundColorObserver();
moodController.setBackgroundObserver(backgroundObserver);

moodController.init();

function showCalendarAndAddMood(color: string): void {
  const calendarOverlay = createCalendar((dateStr) => {
    moodStorage.addMood(color, dateStr);
    moodController.renderMoodGrid();
    moodController.renderPopularMoodDisplay();
  });
  document.body.appendChild(calendarOverlay);
}
