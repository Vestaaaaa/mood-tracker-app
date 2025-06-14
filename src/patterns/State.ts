export interface State {
  handle(context: AppContext): void;
}

export class IdleState implements State {
  handle(context: AppContext): void {
    context.renderIdle();
  }
}

export class LoadingState implements State {
  handle(context: AppContext): void {
    context.renderLoading();
  }
}

export class AppContext {
  private state: State;

  constructor(initialState: State) {
    this.state = initialState;
    this.state.handle(this);
  }

  setState(state: State): void {
    this.state = state;
    this.state.handle(this);
  }

  renderIdle(): void {
    // убрать спиннер
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "none";

    // разблок кнопки
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = false));
  }

  renderLoading(): void {
    //показать спиннер
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "block";

    // блок кнопки
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true));
  }
}
