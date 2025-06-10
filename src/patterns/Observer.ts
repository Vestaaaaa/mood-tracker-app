export interface Observer {
  update(data?: any): void;
}

export interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(data?: any): void;
}

export class MoodSubject implements Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data?: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}
