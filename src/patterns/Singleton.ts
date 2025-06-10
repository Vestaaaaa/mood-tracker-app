export abstract class Singleton<T> {
  private static _instances: Map<Function, any> = new Map();

  protected constructor() {}

  public static getInstance<T>(this: new () => T): T {
    if (!Singleton._instances.has(this)) {
      Singleton._instances.set(this, new this());
    }
    return Singleton._instances.get(this);
  }
}
