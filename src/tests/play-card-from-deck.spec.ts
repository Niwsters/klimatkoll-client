import { Card } from '../game/card'
import { Event, EventToAdd } from '../event/event'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'

describe('card_played_from_deck', () => {
  const card = new Card(0, "blargh", "emissions-line")
  const card2 = new Card(1, "honk", "emissions-line")
  const card3 = new Card(2, "1337", "emissions-line")

  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
  })

  function playCard(state: GameState, card: Card, position: number): [GameState, EventToAdd[]] {
    const event = new Event(0, 'card_played_from_deck', {
      card: card,
      position: position
    })
    return state.card_played_from_deck(event)
  }

  it('adds card to emissions line', () => {
    state = playCard(state, card, 0)[0]
    expect(state.emissionsLine.cards.map(c => c.id)).toEqual([-1, card.id, -2])
  })

  it('adds card to given position', () => {
    state = playCard(state, card, 0)[0]
    state = playCard(state, card2, 2)[0]
    state = playCard(state, card3, 2)[0]

    const result = state.emissionsLine.cards.filter(c => !c.isSpace).map(c => c.id)
    expect(result).toEqual([card.id, card3.id, card2.id])
  })

  it('flips card', () => {
    card.flipped = false
    state = playCard(state, card, 0)[0]
    expect(state.cards.find(c => c.id === card.id).flipped).toEqual(true)
  })
})
