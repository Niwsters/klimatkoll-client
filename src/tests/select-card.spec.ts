import { Event } from '../event/event'
import { Card } from '../game/card'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'

describe('mouse_clicked', () => {
  const card = new Card(3, "blargh", "hand")

  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
  })

  it('sets selectedCardID to undefined if no card is focused', () => {
    state.selectedCardID = 3
    state.hoveredCardIDs = new Set()

    const event = new Event(0, "mouse_clicked", {})
    const result = state.mouse_clicked(event)[0]

    expect(result.selectedCardID).toEqual(undefined)
  })

  it('sets selectedCardID to card ID if card is focused', () => {
    state.selectedCardID = undefined
    state.hand = state.hand.addCard(card)
    state.hoveredCardIDs = new Set([3])

    const event = new Event(0, "mouse_clicked", {})
    const result = state.mouse_clicked(event)[0]

    expect(result.selectedCardID).toEqual(3)
  })

  it('selects card with ID 0', () => {
    state.selectedCardID = undefined
    state.hand = state.hand.addCard(new Card(0, "blargh", "hand"))
    state.hoveredCardIDs = new Set([0])

    const event = new Event(0, "mouse_clicked", {})
    const result = state.mouse_clicked(event)[0]

    expect(result.selectedCardID).toEqual(0)
  })
})
