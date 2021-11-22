import { GameState } from './gamestate'
import { Hand, OpponentHand } from './hand'
import { Card, SpaceCard, transpose } from './card'
import { EmissionsLine } from './emissions-line'
import { Event } from './event'
import {
  ANIMATION_DURATION_MS,
  DISCARD_PILE_POSITION,
  DECK_POSITION,
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'

function getELCardPosition(i: number, cardCount: number): number[] {
  const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
  const startOffset = 0 - cardWidth*cardCount/4 - cardWidth/4

  return [
    EMISSIONS_LINE_POSITION[0] + startOffset + cardWidth/2 * (i+1),
    EMISSIONS_LINE_POSITION[1]
  ]
}

class Factory {
  get Card(): CardFactory {
    return new CardFactory()
  }

  get Event(): EventFactory {
    return new EventFactory()
  }

  new(params: any = {}): Factory {
    return Object.assign(new this.__proto__.constructor(), params)
  }
}

class CardFactory extends Factory {
  _name: string
  _id: number = 0
  _container: string = "deck"

  name(name: string) {
    return this.new({ _name: name })
  }

  get() {
    return new Card(this._id, this._name, this._container)
  }
}

class EventFactory extends Factory {
  type: string = ""
  payload: any = {}

  DrawCardEvent(card: Card, socketID: number): EventFactory {
    return this.new({
      type: "draw_card",
      payload: { card: card, socketID: socketID }
    })
  }

  get(): Event {
    return new Event(0, this.type, this.payload)
  }
}

describe('GameState', () => {
  let state: GameState
  const factory = new Factory()

  beforeEach(() => {
    state = new GameState()
  })

  describe('draw_card', () => {
    let card: Card
    beforeEach(() => {
      card = factory.Card.name("blargh").get()
      state.socketID = 3
      Hand.rearrange = (state: any) => { return state }
    })

    it("puts card in player's hand if socketID is player's socketID", () => {
      const event = factory.Event.DrawCardEvent({...card}, 3).get()
      const result = state.draw_card(event, 0).cards[0]

      expect(result.position).toEqual(DECK_POSITION)
      expect(result.container).toEqual("hand")
    })

    it("puts card in opponent's hand if socketID is not player's socketID", () => {
      const event = factory.Event.DrawCardEvent({...card}, 4).get()
      const result = state.draw_card(event, 0).cards[0]

      expect(result.position).toEqual(DECK_POSITION)
      expect(result.container).toEqual("opponent-hand")
    })
  })

  describe('new', () => {
    it("returns duplicate with given params which retains methods", () => {
      const state = new GameState()
      expect(state.new({ roomID: "blargh" })).toEqual({ ...state, roomID: "blargh"})
      expect(state.next_card).toBeDefined()
    })

    it("returns duplicate of same state if no params specified", () => {
      const state = new GameState()
      expect(state.new()).toEqual(state)
    })
  })

  describe('addToEL()', () => {
    it('adds new card to emissions line', () => {
      const state = new GameState()

      const card = new Card(0, "blargh", "emissions-line")
      const card2 = new Card(1, "honk", "emissions-line")
      const card3 = new Card(2, "1337", "emissions-line")

      let result = state.addToEL(card, 0)
      let expected = [-1, 0, -2]
      expect(result.emissionsLineCardOrder).toEqual(expected)
      expect(result.cards.filter(c => c.isSpace).length).toEqual(2)

      result = result.addToEL(card2, 2)
      result = result.addToEL(card3, 2)
      expected = [-1, 0, -2, 2, -3, 1, -4]
      expect(result.emissionsLineCardOrder).toEqual(expected)
    })

    it('flips card', () => {
      const state = new GameState()

      const card = new Card(0, "blargh", "emissions-line")
      card.flipped = false
      let result = state
        .addToEL(card, 0)
        .cards
        .find(c => c.id === card.id)
      expect(result.flipped).toEqual(true)
    })
  })

  describe('rearrangeEL()', () => {
    describe('space cards', () => {
      let state: GameState
      let sc: SpaceCard
      beforeEach(() => {
        state = new GameState()
        sc = new SpaceCard(-1)
        state.selectedCardID = undefined
        state.cards = [sc]
        state.emissionsLineCardOrder = [-1]
      })

      it('sets space cards to invisible if no card is selected', () => {
        state.selectedCardID = undefined
        const result = state.rearrangeEL(0)
        expect(result.cards[0].visible).toEqual(false)
      })

      it('sets space cards to visible if card is selected', () => {
        state.selectedCardID = 3
        const result = state.rearrangeEL(0)
        expect(result.cards[0].visible).toEqual(true)
      })

      it('sets space cards to visible if selected card ID is 0', () => {
        state.selectedCardID = 0
        const result = state.rearrangeEL(0)
        expect(result.cards[0].visible).toEqual(true)
      })
    })

    it('transposes emissions line cards to their proper positions', () => {
      const card = new Card(0, "blargh", "emissions-line")
      card.position = [1,1]
      const card2 = new Card(1, "1337", "emissions-line")
      card2.position = [2,2]
      const nonELCard = new Card(2, "honk", "hand")
      const state = new GameState()
      state.cards = [card, card2, nonELCard]
      state.emissionsLineCardOrder = [0,1]

      let result = state.rearrangeEL(0)
      expect(result.cards).toEqual([card, card2, nonELCard])

      let timePassed = ANIMATION_DURATION_MS/2
      result = state.rearrangeEL(timePassed)
      let pos1 = getELCardPosition(0, 2)
      let pos2 = getELCardPosition(1, 2)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [
            transpose(1, pos1[0], timePassed),
            transpose(1, pos1[1], timePassed)
          ]
        },
        {
          ...card2,
          position: [
            transpose(2, pos2[0], timePassed),
            transpose(2, pos2[1], timePassed)
          ]
        },
        nonELCard
      ])
    })

    it('puts cards in specified order', () => {
      const state = new GameState()

      const sc1 = new SpaceCard(-1)
      const sc2 = new SpaceCard(-2)
      const card = new Card(0, "blargh", "emissions-line")
      state.cards = [sc1, sc2, card]
      state.emissionsLineCardOrder = [-1, 0, -2]
      const result = state.rearrangeEL(ANIMATION_DURATION_MS)

      // Sort by x-coordinate and see if order matches
      const positionalOrder = result.emissionsLineCardOrder
        .reduce((cards, cardID) => {
          return [...cards, result.cards.find(c => c.id === cardID)]
        }, [])
        .sort((a, b) => a.position[0] - b.position[0])
        .map(c => c.id)

      expect(positionalOrder).toEqual([-1, 0, -2])
    })

    it('does not go over max emissions line length', () => {
      const card = new Card(0, "a", "emissions-line")
      const card2 = new Card(1, "b", "emissions-line")
      const card3 = new Card(2, "c", "emissions-line")
      const card4 = new Card(3, "d", "emissions-line")
      const card5 = new Card(4, "e", "emissions-line")
      const card6 = new Card(5, "f", "emissions-line")
      const state = new GameState()
      state.cards = [
        card,
        card2,
        card3,
        card4,
        card5,
        card6
      ]
      state.emissionsLineCardOrder = [0, 1, 2, 3, 4, 5]

      const result = state.rearrangeEL(ANIMATION_DURATION_MS)
      const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
      const leftEdge = result.cards.find(c => c.id === 0).position[0] - cardWidth/2
      const rightEdge = result.cards.find(c => c.id === 5).position[0] + cardWidth/2

      expect(rightEdge - leftEdge).toEqual(EMISSIONS_LINE_MAX_LENGTH)
    })

    it('hover-zooms card if no card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      const state = new GameState()
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = [0]

      const result = state
        .rearrangeEL(ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card.id)
        .scale

      expect(result).toEqual(Card.DEFAULT_SCALE*2)
    })

    it('does not hover-zoom card if card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      const state = new GameState()
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = [0]
      state.selectedCardID = 1

      const result = state
        .rearrangeEL(ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card.id)
        .scale

      expect(result).toEqual(Card.DEFAULT_SCALE)
    })
  })

  describe('next_card', () => {
    it("creates a new deck card if none exists", () => {
      const state = new GameState()

      const timePassed = 3
      const event = new Event(0, "next_card", {
        card: {
          id: 13,
          name: "blargh"
        }
      }, 0)

      const result = state.next_card(event, timePassed)
      const card = new Card(13, "blargh", "deck")
      card.position = DECK_POSITION

      expect(result.cards).toEqual([card])
      expect(result.next_card).toBeDefined()
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

      const result = state.next_card(event, timePassed)

      expect(result.cards).toEqual([card2])
    })
  })

  describe('mouse_clicked', () => {
    it('sets selectedCardID to undefined if no card is focused', () => {
      const state = new GameState()
      state.selectedCardID = 3
      state.hoveredCardIDs = []

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = state.mouse_clicked(event, timePassed)

      expect(result.selectedCardID).toEqual(undefined)
      expect(result.mouse_clicked).toBeDefined()
    })

    it('sets selectedCardID to card ID if card is focused', () => {
      const state = new GameState()
      state.selectedCardID = undefined
      state.cards = [new Card(3, "blargh", "hand")]
      state.hoveredCardIDs = [3]

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = state.mouse_clicked(event, timePassed)

      expect(result.selectedCardID).toEqual(3)
    })

    it('selects card with ID 0', () => {
      const state = new GameState()
      state.selectedCardID = undefined
      state.cards = [new Card(0, "blargh", "hand")]
      state.hoveredCardIDs = [0]

      const event = new Event(0, "mouse_clicked", {}, 0)
      const timePassed = 3
      const result = state.mouse_clicked(event, timePassed)

      expect(result.selectedCardID).toEqual(0)
    })

    it('rearranges emissions line', () => {
      const state = new GameState()
      let calledWith: any[]
      state.rearrangeEL = (...args) => { calledWith = args }
      const event = new Event(0, "mouse_clicked", {}, 0)
      state.mouse_clicked(event, 3)

      expect(calledWith).toEqual([3])
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

  describe('incorrect_card_placement', () => {
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
      let result = state.incorrect_card_placement(event, timePassed)
      expect(result.cards).toEqual([
        { ...card, container: "discard-pile" },
        card2
      ])

      timePassed = ANIMATION_DURATION_MS/2
      result = state.incorrect_card_placement(event, timePassed)
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
      result = state.incorrect_card_placement(event, timePassed)
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
      let result = state.incorrect_card_placement(event, timePassed)
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
      let result = state
        .incorrect_card_placement(event, timePassed)
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

      let result = state
        .incorrect_card_placement(event, ANIMATION_DURATION_MS)

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
