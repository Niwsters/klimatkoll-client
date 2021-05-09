import { of, Observable, BehaviorSubject } from 'rxjs'
import { Event } from './event'

describe('Event', () => {
  let serverEvents$
  let commands$
  let streams$

  beforeEach(() => {
    serverEvents$ = new BehaviorSubject<Event[]>([
      {
        event_id: 1,
        event_type: "test",
        payload: { blargh: "honk" },
        timestamp: 7.1
      }
    ])
    commands$ = new BehaviorSubject<Event[]>([
      {
        event_id: 1,
        event_type: "test2",
        payload: { honk: "blargh" },
        timestamp: 3.3
      },
      {
        event_id: 2,
        event_type: "test2",
        payload: { honk: "blargh" },
        timestamp: 13.2
      }
    ])
    streams$ = [serverEvents$, commands$]
  })

  describe('from()', () => {
    it('returns builder with given event streams', () => {
      const builder = Event.from([serverEvents$, commands$])

      expect(builder.streams$).toEqual([serverEvents$, commands$])
    })
  })

  describe('get()', () => {
    it('merges Event and Event streams', () => {
      const result = Event
        .from(streams$)
        .get()

      const expected = [
        {
          event_id: 0,
          event_type: "test2",
          payload: { honk: "blargh" },
          timestamp: 3.3
        },
        {
          event_id: 1,
          event_type: "test",
          payload: { blargh: "honk" },
          timestamp: 7.1
        },
        {
          event_id: 2,
          event_type: "test2",
          payload: { honk: "blargh" },
          timestamp: 13.2
        }
      ]

      expect(result).toEqual(expected)
    })

    it('sorts events on id, then on timestamp', () => {
      streams$ = [
        new BehaviorSubject([
          {
            event_id: 3,
            event_type: "a",
            payload: {},
            timestamp: 7.1
          },
          {
            event_id: 1,
            event_type: "b",
            payload: {},
            timestamp: 7.1
          },
          {
            event_id: 5,
            event_type: "c",
            payload: {},
            timestamp: 3.3
          }
        ])
      ]

      const expected = [
        {
          event_id: 0,
          event_type: "c",
          payload: {},
          timestamp: 3.3
        },
        {
          event_id: 1,
          event_type: "b",
          payload: {},
          timestamp: 7.1
        },
        {
          event_id: 2,
          event_type: "a",
          payload: {},
          timestamp: 7.1
        },
      ]

      const result = Event
        .from(streams$)
        .get()

      expect(result).toEqual(expected)
    })
  })

  describe('observable()', () => {
    it('returns merged event stream as observable', () => {
      let result: Event[] | undefined
      const builder = Event
        .from(streams$)

      const obs = builder
        .observable()
        .subscribe((events: Event[]) => result = events)

      const expected = builder.get()

      expect(result).toEqual(expected)

      const newEvent = {
        event_id: 3,
        event_type: "test",
        payload: { blargh: "honk" },
        timestamp: 20.0
      }
      serverEvents$.next([
        ...serverEvents$.value,
        newEvent
      ])

      expect(result).toEqual([
        ...expected,
        newEvent
      ])
    })
  })
})
