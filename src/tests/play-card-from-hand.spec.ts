import { Card } from '../game/card'
import { Event, EventToAdd } from '../event/event'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'

describe('card_played_from_hand', () => {
  const card = new Card(0, "blargh", "hand")
  const card2 = new Card(1, "honk", "emissions-line")
  const card3 = new Card(2, "1337", "emissions-line")

  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
  })

  function playCard(state: GameState, card: Card, position: number): [GameState, EventToAdd[]] {
    state.cards = [...state.cards, card]
    state.selectedCardID = card.id
    const event = new Event(0, 'card_played_from_hand', {
      socketID: state.socketID,
      cardID: card.id,
      position: position
    })
    return state.card_played_from_hand(event)
  }

  it('deselects hand card', () => {
    state = playCard(state, card, 0)[0]
    expect(state.selectedCardID).toBe(undefined)
  })

  it('adds card to EL', () => {
    state = playCard(state, card, 0)[0]
    expect(state.emissionsLine.cards.map(c => c.id)).toEqual([-1, card.id, -2])
  })

  it('removes card from hand', () => {
    state = playCard(state, card, 0)[0]
    expect(state.cards.findIndex(c => c.container === "hand")).toEqual(-1)
  })

  it('plays card to given position', () => {
    state = playCard(state, card, 0)[0]
    state = playCard(state, card2, 2)[0]
    state = playCard(state, card3, 2)[0]

    const result = state.emissionsLine.cards.filter(c => !c.isSpace).map(c => c.id)
    expect(result).toEqual([card.id, card3.id, card2.id])
  })
})
