import { MoodStorage } from "./services/MoodStorage";
import { MoodController } from "./controllers/MoodController";

const moodStorage = MoodStorage.getInstance();
const moodController = new MoodController(moodStorage);

moodController.init();
