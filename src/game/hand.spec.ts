import { Card, transpose } from './card'
import { Hand, OpponentHand } from './hand'
import { GameState } from './gamestate'
import {
  ANIMATION_DURATION_MS,
  HAND_POSITION,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_CARD_ANGLE,
  OPPONENT_HAND_POSITION,
} from './constants'

function getHandCardPosition(i: number, cardCount: number): number[] {
  const n = cardCount - 1
  let angle = HAND_CARD_ANGLE * (i - n/2)
  let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

function getOpponentHandCardPosition(i: number, cardCount: number): number[] {
  const n = cardCount - 1
  const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
  const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

describe('Hand', () => {
  describe('rearrange()', () => {
    it('transposes hand cards to their proper positions', () => {
      const card = new Card(0, "blargh", "hand")
      card.position = [1,1]
      const card2 = new Card(1, "1337", "hand")
      card2.position = [2,2]
      const nonHandCard = new Card(2, "honk", "opponent-hand")
      const state = new GameState()
      state.cards = [card, card2, nonHandCard]
      state.emissionsLineCardOrder = [0,1]

      let timePassed = ANIMATION_DURATION_MS/2
      let pos1 = getHandCardPosition(0, 2)
      let pos2 = getHandCardPosition(1, 2)
      const currentTime = 1337
      let result = Hand.rearrange(state, timePassed, currentTime)
      expect(result.cards).toEqual([
        Card.transpose(card, {
          timestamp: currentTime,
          position: pos1,
          rotation: -0.15707963267948966,
          scale: 0.275
        }),
        Card.transpose(card2, {
          timestamp: currentTime,
          position: pos2,
          rotation: 0.15707963267948966,
          scale: 0.275
        }),
        nonHandCard
      ])
    })
  })
})

describe('OpponentHand', () => {
  describe('rearrange()', () => {
    it('transposes emissions line cards to their proper positions', () => {
      const card = new Card(0, "blargh", "opponent-hand")
      card.position = [1,1]
      const card2 = new Card(1, "1337", "opponent-hand")
      card2.position = [2,2]
      const nonHandCard = new Card(2, "honk", "hand")
      const state = new GameState()
      state.cards = [card, card2, nonHandCard]
      state.emissionsLineCardOrder = [0,1]

      let timePassed = ANIMATION_DURATION_MS
      const currentTime = 1337
      let result = OpponentHand.rearrange(state, timePassed, currentTime)
      let pos1 = getOpponentHandCardPosition(0, 2)
      let pos2 = getOpponentHandCardPosition(1, 2)
      expect(result.cards).toEqual([
        Card.transpose(card, {
          position: pos1,
          rotation: 2.9845130209103035,
          timestamp: currentTime 
        }),
        Card.transpose(card2, {
          position: pos2,
          rotation: 3.2986722862692828,
          timestamp: currentTime
        }),
        nonHandCard
      ])
    })
  })
})
