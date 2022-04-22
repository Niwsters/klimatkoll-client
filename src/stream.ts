export type Listener<T> = (value: T) => void

export interface Stream<T> {
  subscribe(listener: Listener<T>): void
}

export class StreamSource<T> implements Stream<T> {
  private _value: T 
  private listeners: Listener<T>[] = []

  constructor(initialValue: T) {
    this._value = initialValue
  }

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener)
    listener(this._value)
  }

  next(value: T) {
    this._value = value
    for (const listener of this.listeners) {
      listener(this._value)
    }
  }

  get value(): T {
    return this._value
  }
}
