import { Card } from '../game/card'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { DISCARD_PILE_POSITION } from '../game/constants'
import { Event } from '../event/event'

const currentTime: number = 1337

function receiveEvent(state: GameState, card: Card): GameState {
  const event = new Event(0, "incorrect_card_placement", { cardID: card.id })
  return state.incorrect_card_placement(event, currentTime)[0]
}

describe('incorrect_card_placement', () => {
  const card = new Card(7, "blargh", "hand")
  const event = new Event(0, "incorrect_card_placement", { cardID: card.id })

  let state: GameState
  beforeEach(() => {
    card.rotationGoal.rotation = 30
    card.addedRotationGoal.addedRotation = 15

    state = Factory.GameState()
    state.hand = state.hand.addCard(card)
    state = receiveEvent(state, card)
  })

  it("moves card to discard pile", () => {
    const movedCard = state.cards.find(c => c.id === card.id)
    expect(movedCard.container).toEqual("discard-pile")
    expect(movedCard.positionGoal).toEqual({
      position: DISCARD_PILE_POSITION,
      timestamp: currentTime
    })
    expect(movedCard.rotationGoal).toEqual({
      rotation: 0,
      timestamp: currentTime
    })
    expect(movedCard.addedRotationGoal).toEqual({
      addedRotation: 0,
      timestamp: currentTime
    })
  })

  it("removes card from hand", () => {
    expect(state.hand.cards).toEqual([])
  })

  it("removes card from opponent hand", () => {
    const card = new Card(6, "honk", "opponent-hand")
    state.opponentHand = state.opponentHand.addCard(card)
    state = receiveEvent(state, card)
    expect(state.opponentHand.cards).toEqual([])
  })

  it('flips discarded card', () => {
    const result = state.cards.find(c => c.id === card.id)
    expect(result.flipped).toEqual(true)
  })

  it('deselects selected card', () => {
    state.selectedCardID = card.id
    state = state.incorrect_card_placement(event, currentTime)[0]
    expect(state.selectedCardID).toEqual(undefined)
  })
})
