import { GameState } from './gamestate'
import { Hand, OpponentHand } from './hand'
import { Card, transpose } from './card'
import { EmissionsLine } from './emissions-line'
import { Event } from './event'
import { ANIMATION_DURATION_MS, DISCARD_PILE_POSITION, DECK_POSITION } from './constants'

describe('GameState', () => {
  describe('nextCard', () => {
    it("creates a new deck card if none exists", () => {
      const state = new GameState()

      const timePassed = 3
      const event = new Event(0, "next_card", {
        card: {
          id: 13,
          name: "blargh"
        }
      }, 0)

      const result = GameState.nextCard(state, event, timePassed)
      const card = new Card(13, "blargh", "deck")
      card.position = DECK_POSITION

      expect(result.cards).toEqual([card])
    })

    it("replaces existing deck card if exists", () => {
      const state = new GameState()
      const timePassed = 3
      const card = new Card(13, "blargh", "deck")
      state.cards = [card]

      const event = new Event(0, "next_card", {
        card: {
          id: 1,
          name: "honk"
        }
      }, 0)

      const card2 = new Card(1, "honk", "deck")
      card2.position = DECK_POSITION

      const result = GameState.nextCard(state, event, timePassed)

      expect(result.cards).toEqual([card2])
    })
  })

  describe('mouseClicked', () => {
    /*
    const focusedCardID = GameState.getFocusedCardID(state)
    if (focusedCardID === undefined) {
      state.selectedCardID = undefined
    } else {
      const card = state.cards.find(c => c.id === focusedCardID)

      if (card && card.container === "hand") {
        state.selectedCardID = focusedCardID
      }
    }
    state = EmissionsLine.rearrange(state, timePassed)
    */

    it('sets selectedCardID to undefined if no card is focused', () => {
      const state = new GameState()
      state.selectedCardID = 3
      state.hoveredCardIDs = []

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = GameState.mouseClicked(state, event, timePassed)

      expect(result.selectedCardID).toEqual(undefined)
    })

    it('sets selectedCardID to card ID if card is focused', () => {
      const state = new GameState()
      state.selectedCardID = undefined
      state.cards = [new Card(3, "blargh", "hand")]
      state.hoveredCardIDs = [3]

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = GameState.mouseClicked(state, event, timePassed)

      expect(result.selectedCardID).toEqual(3)
    })

    it('selects card with ID 0', () => {
      const state = new GameState()
      state.selectedCardID = undefined
      state.cards = [new Card(0, "blargh", "hand")]
      state.hoveredCardIDs = [0]

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = GameState.mouseClicked(state, event, timePassed)

      expect(result.selectedCardID).toEqual(0)
    })
  })

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
          position: [
            transpose(1, DISCARD_PILE_POSITION[0], timePassed),
            transpose(1, DISCARD_PILE_POSITION[1], timePassed)
          ],
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

      state.cards = [card2, card3]

      let expected1 = Hand
        .rearrange(state, ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card2.id)

      let expected2 = OpponentHand
        .rearrange(state, ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card3.id)

      expect(result.cards.find(c => c.id === card2.id).position).toEqual(expected1.position)
      expect(result.cards.find(c => c.id === card3.id).position).toEqual(expected2.position)
    })
  })
})
