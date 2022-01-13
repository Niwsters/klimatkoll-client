import { Subject } from 'rxjs'
import { Event, EventToAdd, MouseMovedEvent } from '../event/event'

export class UserInput {
  events$: Subject<EventToAdd> = new Subject()

  constructor() {
    const canvas = document.getElementById('klimatkoll-canvas')

    if (!canvas)
      throw new Error("Could not find canvas with ID #klimatkoll-canvas");

    canvas.addEventListener('mousemove', (e: any) => {
      this.events$.next(new MouseMovedEvent(e.clientX, e.clientY))
    }, false)
  }

  handleEvent(event: Event): void {
  }
}
