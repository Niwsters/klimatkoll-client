import { Observable, BehaviorSubject } from 'rxjs'
import { zip, map, tap, combineLatest } from 'rxjs/operators'

export interface ServerEvent {
  event_id: number
  event_type: string
  payload: any
}

export class EventBuilder {
  streams$: BehaviorSubject<Event[]>[]
  pipes: ((events: Event[]) => Event[])[] = []

  constructor(
    streams$: BehaviorSubject<Event[]>[]
  ) {
    this.streams$ = streams$
  }

  pipe(func: (events: Event[]) => Event[]): EventBuilder {
    this.pipes.push(func)

    return this
  }

  on(type: string, func: (event: Event) => Event[]): EventBuilder {
    return this.pipe((events: Event[]) => {
      return events.reduce((events: Event[], event: Event) => {
        if (event.event_type !== type) return [...events, event];

        return [
          ...events,
          ...func(event)
        ]
      }, [])
    })
  }

  get(): Event[] {
    let events: Event[] = this.streams$
      .reduce((events: Event[], stream$: BehaviorSubject<Event[]>) => {
        return [
          ...events,
          ...stream$.value
        ]
      }, [])

    return this.pipes
      .reduce((events, pipe) => pipe(events), events)
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

      this.pipes.forEach(pipe => builder = builder.pipe(pipe))

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
