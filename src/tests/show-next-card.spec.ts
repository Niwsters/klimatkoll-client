import { Event } from '../event/event'
import { Card } from '../game/card'
import { DECK_POSITION } from '../game/constants'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'

describe('next_card', () => {
  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
  })

  it("creates a new deck card if none exists", () => {
    const event = new Event(0, "next_card", {
      card: {
        id: 13,
        name: "blargh"
      }
    })

    const result = state.next_card(event)[0]
    const card = new Card(13, "blargh", "deck")
    card.position = DECK_POSITION

    expect(result.cards).toEqual([card])
    expect(result.next_card).toBeDefined()
  })

  it("replaces existing deck card if exists", () => {
    const card = new Card(13, "blargh", "deck")
    state.cards = [card]

    const event = new Event(0, "next_card", {
      card: {
        id: 1,
        name: "honk"
      }
    })

    const card2 = new Card(1, "honk", "deck")
    card2.position = DECK_POSITION

    const result = state.next_card(event)[0]

    expect(result.cards).toEqual([card2])
  })
})
