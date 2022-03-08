import { Event } from '../event/event'
import { Card } from '../game/card'
import { DECK_POSITION } from '../game/constants'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'

describe('next_card', () => {
  const card = new Card(13, "blargh", "deck")

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
    card.position = DECK_POSITION

    expect(result.cards).toEqual([card])
  })

  it("replaces existing deck card if exists", () => {
    const card = new Card(13, "blargh", "deck")
    state.deck = state.deck.setTopCard(card)

    const event = new Event(0, "next_card", {
      card: {
        id: 1,
        name: "honk"
      }
    })

    const expectedCard = new Card(1, "honk", "deck")
    expectedCard.position = DECK_POSITION

    const result = state.next_card(event)[0]

    expect(result.cards).toEqual([expectedCard])
  })
})
