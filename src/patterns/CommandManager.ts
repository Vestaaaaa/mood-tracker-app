import type { Command } from "./Command";

export class CommandManager {
  private undoStack: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.undoStack.push(command);
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (command && command.undo) {
      command.undo();
    }
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  clear(): void {
    this.undoStack = [];
  }
}
