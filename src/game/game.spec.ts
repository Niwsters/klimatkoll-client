import { Game } from './game'
import { GameState } from './gamestate'
import { Subject, BehaviorSubject } from 'rxjs'
import { Event } from '../event/event'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  it('has properties', () => {
    expect(game.events$).toEqual(new Subject<EventToAdd>())
    expect(game.state$).toEqual(new BehaviorSubject<GameState>(new GameState()))
  })

  describe('handleEvent()', () => {
    let event: Event
    beforeEach(() => {
      event = new Event(0, "blargh", {})
    })

    it('calls relevant GameState method', () => {
      const obj = { blargh: "honk" }
      let calledWith: any[]
      game.state$.value.blargh = (...args) => {
        return obj
      }
      game.handleEvent(event)
      expect(game.state$.value).toEqual(obj)
    })

    it('does nothing if relevant GameState method is not defined', () => {
      const original = {...game.state$.value}
      game.handleEvent(event)
      expect(game.state$.value).toEqual(original)
    })
  })
})
