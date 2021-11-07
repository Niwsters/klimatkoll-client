import { Subject } from 'rxjs'
import { Event, EventToAdd } from './event'

export class EventStream {
  private stream$: Subject<Event> = new Subject<Event>();
  private lastEventID: number = 0

  public next(event: EventToAdd): void {
    this.stream$.next({
      ...event,
      event_id: this.lastEventID++
    })
  }

  public subscribe(func: (e: Event) => void) {
    this.stream$.subscribe(func);
  }
}
