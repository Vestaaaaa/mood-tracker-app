export interface State {
  handle(): void;
}

export class MoodState implements State {
  handle(): void {
    console.log("Режим выбора настроения");
    // ...
  }
}

export class StatsState implements State {
  handle(): void {
    console.log("Режим просмотра статистики");
    // ...
  }
}

export class Context {
  private state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  setState(state: State): void {
    this.state = state;
  }

  request(): void {
    this.state.handle();
  }
}
