import { Card } from '../game/card'
import { Hand } from '../game/hand'
import {
  ANIMATION_DURATION_MS,
  HAND_POSITION,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_CARD_ANGLE,
} from '../game/constants'
import { Factory } from './test-factory'

function getHandCardPosition(i: number, cardCount: number): number[] {
  const n = cardCount - 1
  let angle = HAND_CARD_ANGLE * (i - n/2)
  let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

describe('Hand', () => {
  describe('rearrange()', () => {
    it('transposes hand cards to their proper positions', () => {
      let card = new Card(0, "blargh", "hand")
      card.position = [1,1]
      let card2 = new Card(1, "1337", "hand")
      card2.position = [2,2]
      const nonHandCard = new Card(2, "honk", "opponent-hand")
      const state = Factory.GameState()
      state.cards = [card, card2, nonHandCard]
      state.emissionsLineCardOrder = [0,1]

      let timePassed = ANIMATION_DURATION_MS/2
      let pos1 = getHandCardPosition(0, 2)
      let pos2 = getHandCardPosition(1, 2)
      const currentTime = 1337
      let result = Hand.rearrange(state, timePassed, currentTime)

      card = Card.move(card, pos1[0], pos1[1], currentTime)
      card = Card.rotateGlobal(card, -0.15707963267948966, currentTime)
      card = Card.scale(card, 0.275, currentTime)

      card2 = Card.move(card2, pos2[0], pos2[1], currentTime)
      card2 = Card.rotateGlobal(card2, 0.15707963267948966, currentTime)
      card2 = Card.scale(card2, 0.275, currentTime)

      expect(result.cards).toEqual([card, card2, nonHandCard])
    })
  })
})
