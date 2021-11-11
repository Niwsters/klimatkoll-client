import { Game } from './game'
import { Subject } from 'rxjs'

describe('Game', () => {
  it('has event stream', () => {
    const game = new Game()
    expect(game.events$).toEqual(new Subject<EventToAdd>())
  })
})
