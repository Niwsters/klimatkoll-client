import { Card } from './card'
import { Hand, OpponentHand } from './hand'
import { GameState } from './gamestate'
import { ANIMATION_DURATION_MS } from './constants'

describe('Hand', () => {
  describe('rearrange()', () => {
    it('transposes emissions line cards to their proper positions', () => {
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

      result = Hand.rearrange(state, ANIMATION_DURATION_MS/2)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [313.8974508437579, 371.42076127786345],
          rotation: -0.11780972450961724
        },
        {
          ...card2,
          position: [406.85254915624216, 371.67076127786345],
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

      result = OpponentHand.rearrange(state, ANIMATION_DURATION_MS)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [541.8033988749895, 45.10565162951535],
          rotation: 2.9845130209103035
        },
        {
          ...card2,
          position: [418.19660112501055, 45.105651629515364],
          rotation: 3.2986722862692828
        },
        nonHandCard
      ])
    })
  })
})
