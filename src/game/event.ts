import { Observable, BehaviorSubject } from 'rxjs'
import { map, combineLatest } from 'rxjs/operators'

export interface ServerEvent {
  event_id: number
  event_type: string
  payload: any
}

export class EventBuilder {
  streams$: BehaviorSubject<Event[]>[]

  constructor(
    streams$: BehaviorSubject<Event[]>[]
  ) {
    this.streams$ = streams$
  }

  get(): Event[] {
    return this.streams$
      .reduce((events: Event[], stream$: BehaviorSubject<Event[]>) => {
        return [
          ...events,
          ...stream$.value
        ]
      }, [])
      .sort((a: Event, b: Event) => (a.event_id || 0) - (b.event_id || 0))
      .sort((a: Event, b: Event) => a.timestamp - b.timestamp)
      .map((event: Event, i: number) => {
        return {
          ...event,
          event_id: i
        }
      })
  }

  observable(): Observable<Event[]> {
    let observable: Observable<Event[]> = this.streams$[0]
    
    // Merge all streams
    this.streams$
      .slice(1, this.streams$.length)
      .forEach(stream$ => {
        observable = observable.pipe(
          combineLatest(stream$),
          map(stream => stream.reduce((events, stream) => [...events, ...stream], []))
        )
      })

    // Use .get() to avoid duplicate code
    return observable.pipe(map((events: Event[]) => {
      const bs$ = new BehaviorSubject(events)
      let builder = Event
        .from([bs$])

      return builder.get()
    }))
  }
}

export class Event {
  event_id?: number
  event_type: string
  payload: any
  timestamp: number

  constructor(
    event_id: number,
    event_type: string,
    payload: any,
    timestamp: number
  ) {
    this.event_id = event_id
    this.event_type = event_type
    this.payload = payload
    this.timestamp = timestamp
  }

  static from(
    streams$: BehaviorSubject<Event[]>[]
  ): EventBuilder {
    return new EventBuilder(streams$)
  }
}
