import { GameState } from './gamestate'
import { Card } from './card'
import { Event } from './event'
import { ANIMATION_DURATION_MS, DISCARD_PILE_POSITION } from './constants'

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

  describe('incorrectCardPlacement', () => {

    it('throws specified card into discard pile', () => {
      const state = new GameState()

      const card = new Card(7, "blargh", "hand")
      card.rotation = 30
      card.addedRotation = 15
      card.position = [1, 1]
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 }, 0)

      let timePassed = 0
      let result = GameState.incorrectCardPlacement(state, event, timePassed)
      expect(result.cards).toEqual([
        { ...card, container: "discard-pile" },
        card2
      ])

      timePassed = ANIMATION_DURATION_MS/2
      result = GameState.incorrectCardPlacement(state, event, timePassed)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [645.25, 202.75],
          rotation: 7.5,
          addedRotation: 3.75,
          container: "discard-pile"
        },
        card2
      ])

      timePassed = ANIMATION_DURATION_MS
      result = GameState.incorrectCardPlacement(state, event, timePassed)
      expect(result.cards).toEqual([
        {
          ...card,
          position: DISCARD_PILE_POSITION,
          rotation: 0,
          addedRotation: 0,
          container: "discard-pile"
        },
        card2
      ])
    })

    it('deselects card', () => {
      const state = new GameState()
      state.selectedCardID = 7

      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 }, 0)

      let timePassed = 0
      let result = GameState.incorrectCardPlacement(state, event, timePassed)
      expect(result.selectedCardID).toEqual(undefined)
    })

    it('flips card', () => {
      const state = new GameState()

      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 }, 0)

      let timePassed = 0
      let result = GameState
        .incorrectCardPlacement(state, event, timePassed)
        .cards
        .find(c => c.id === card.id)
      expect(result.flipped).toEqual(true)
    })

    it('rearranges hands', () => {
      const state = new GameState()

      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "honk", "hand")
      const card3 = new Card(3, "1337", "opponent-hand")

      state.cards = [
        card,
        card2,
        card3
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: card.id }, 0)

      let result = GameState
        .incorrectCardPlacement(state, event, ANIMATION_DURATION_MS)

      expect(result.cards.find(c => c.id === card2.id).position).toEqual([480, 490])
      expect(result.cards.find(c => c.id === card3.id).position).toEqual([480, 50])
    })
  })
})
