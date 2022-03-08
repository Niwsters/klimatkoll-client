import { Card } from '../game/card'
import { ANIMATION_DURATION_MS, HAND_CARD_ANGLE, HAND_X_RADIUS, HAND_Y_RADIUS, OPPONENT_HAND_POSITION } from '../game/constants'
import { OpponentHand } from '../game/hand'
import { Factory } from './test-factory'

function getOpponentHandCardPosition(i: number, cardCount: number): number[] {
  const n = cardCount - 1
  const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
  const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

describe('Rearrange opponent hand', () => {
  it('transposes emissions line cards to their proper positions', () => {
    let card = new Card(0, "blargh", "opponent-hand")
    card.position = [1,1]
    let card2 = new Card(1, "1337", "opponent-hand")
    card2.position = [2,2]
    const nonHandCard = new Card(2, "honk", "hand")
    const state = Factory.GameState()
    state.cards = [card, card2, nonHandCard]
    state.emissionsLineCardOrder = [0,1]

    let timePassed = ANIMATION_DURATION_MS
    const currentTime = 1337
    let result = OpponentHand.rearrange(state, timePassed, currentTime)
    let pos1 = getOpponentHandCardPosition(0, 2)
    let pos2 = getOpponentHandCardPosition(1, 2)

    card = Card.move(card, pos1[0], pos1[1], currentTime)
    card = Card.rotateGlobal(card, 2.9845130209103035, currentTime)

    card2 = Card.move(card2, pos2[0], pos2[1], currentTime)
    card2 = Card.rotateGlobal(card2, 3.2986722862692828, currentTime)

    expect(result.cards).toEqual([card, card2, nonHandCard])
  })
})
