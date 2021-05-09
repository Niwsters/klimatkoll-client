import { GameState } from './gamestate'
import { Card } from './card'

describe('GameState', () => {
  describe('updateCards', () => {
    it("should replace existing cards with given cards' attributes", () => {
      const state = new GameState()

      const card1 = new Card(0, "blargh", "emissions-line")
      const card2 = new Card(1, "honk", "hand")

      state.cards = [
        card1,
        card2
      ]

      const updatedCard ={
        ...card1,
        position: [1337, 1337]
      }

      const newState = GameState.updateCards(state, [updatedCard])

      expect(newState.cards).toEqual([updatedCard, card2])
    })
  })
})
