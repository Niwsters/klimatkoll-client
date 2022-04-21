export type Listener<T> = (value: T) => void

export interface Stream<T> {
  subscribe(listener: Listener<T>): void
}

export class StreamSource<T> implements Stream<T> {
  private value: T 
  private listeners: Listener<T>[] = []

  constructor(initialValue: T) {
    this.value = initialValue
  }

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener)
    listener(this.value)
  }

  next(value: T) {
    this.value = value
    for (const listener of this.listeners) {
      listener(this.value)
    }
  }
}
