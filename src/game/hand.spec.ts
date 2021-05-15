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

      let result = Hand.rearrange(state, 0)
      expect(result.cards).toEqual([card, card2, nonHandCard])

      let timePassed = ANIMATION_DURATION_MS/2
      let pos1 = getHandCardPosition(0, 2)
      let pos2 = getHandCardPosition(1, 2)
      result = Hand.rearrange(state, timePassed)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [
            transpose(1, pos1[0], timePassed),
            transpose(1, pos1[1], timePassed)
          ],
          rotation: -0.11780972450961724
        },
        {
          ...card2,
          position: [
            transpose(2, pos2[0], timePassed),
            transpose(2, pos2[1], timePassed)
          ],
          rotation: 0.11780972450961724
        },
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

      let result = OpponentHand.rearrange(state, 0)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [1, 1]
        },
        {
          ...card2,
          position: [2, 2]
        },
        nonHandCard
      ])

      let timePassed = ANIMATION_DURATION_MS
      result = OpponentHand.rearrange(state, timePassed)
      let pos1 = getOpponentHandCardPosition(0, 2)
      let pos2 = getOpponentHandCardPosition(1, 2)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [
            transpose(1, pos1[0], timePassed),
            transpose(1, pos1[1], timePassed)
          ],
          rotation: 2.9845130209103035
        },
        {
          ...card2,
          position: [
            transpose(1, pos2[0], timePassed),
            transpose(1, pos2[1], timePassed)
          ],
          rotation: 3.2986722862692828
        },
        nonHandCard
      ])
    })
  })
})
