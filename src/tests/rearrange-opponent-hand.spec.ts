import { Card } from '../game/card'
import { ANIMATION_DURATION_MS, HAND_CARD_ANGLE, HAND_X_RADIUS, HAND_Y_RADIUS, OPPONENT_HAND_POSITION } from '../game/constants'
import { Factory } from './test-factory'

function getOpponentHandCardPosition(i: number, cardCount: number): number[] {
  const n = cardCount - 1
  const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
  const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

describe('Rearrange opponent hand', () => {
  const state = Factory.GameState()
  const currentTime = 1337

  it('moves OpponenHand cards to their positions', () => {
    let card = new Card(0, "blargh", "opponent-hand")
    let card2 = new Card(1, "1337", "opponent-hand")

    // Given cards are in opponent hand
    state.opponentHand = state.opponentHand.addCard(card)
    state.opponentHand = state.opponentHand.addCard(card2)

    // It moves them to their positions
    const result = state
      .update(currentTime) // Queue animations
      .update(currentTime + ANIMATION_DURATION_MS) // Finish animations

    let pos1 = getOpponentHandCardPosition(0, 2)
    let pos2 = getOpponentHandCardPosition(1, 2)

    card = Card.move(card, pos1[0], pos1[1], currentTime)
    card = Card.rotateGlobal(card, 2.9845130209103035, currentTime)
    card = Card.update(card, currentTime + ANIMATION_DURATION_MS)

    card2 = Card.move(card2, pos2[0], pos2[1], currentTime)
    card2 = Card.rotateGlobal(card2, 3.2986722862692828, currentTime)
    card2 = Card.update(card2, currentTime + ANIMATION_DURATION_MS)

    expect(result.cards).toEqual([card, card2])
  })
})
