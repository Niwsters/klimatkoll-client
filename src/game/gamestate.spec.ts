import { GameState } from './gamestate'
import { Hand, OpponentHand } from './hand'
import { Card, SpaceCard } from './card'
import { Event } from '../event/event'
import {
  ANIMATION_DURATION_MS,
  DISCARD_PILE_POSITION,
  DECK_POSITION,
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'
import { AppConfig } from '../App'

function getELCardPosition(i: number, cardCount: number): number[] {
  const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
  const startOffset = 0 - cardWidth*cardCount/4 - cardWidth/4

  return [
    EMISSIONS_LINE_POSITION[0] + startOffset + cardWidth/2 * (i+1),
    EMISSIONS_LINE_POSITION[1]
  ]
}

const Factory = {
  event: {
    draw_card: (cardID: number, cardName: string, socketID: number) => {
      return new Event(0, "draw_card", { card: { id: cardID, name: cardName }, socketID })
    }
  }
}

describe('GameState', () => {
  let state: GameState
  beforeEach(() => {
    const text = {
      connectedToServer: "string",
      roomFull: "string",
      roomExists: "string",
      roomLeft: "string",
      roomJoined: "string",
      roomOpponentLeft: "string",
      reconnecting: "string",
      btnCreateGame: "string",
      btnJoinGame: "string",
      inputRoomID: "string",
      altClimateCallLogo: "string",
      waitingForPlayer: "string",
      yourTurn: "string",
      opponentsTurn: "string",
      youWon: "string",
      youLost: "string",
      labelRoom: "string",
      btnLeaveGame: "string"
    }
    const config = new AppConfig(true, "blargh", text)
    state = new GameState(config)
  })

  describe('draw_card', () => {
    let card: Card
    beforeEach(() => {
      card = new Card(0, "some-card", "hand")
      state.socketID = 3
      Hand.rearrange = (state: any) => { return state }
    })

    it("puts card in player's hand if socketID is player's socketID", () => {
      const event = Factory.event.draw_card(card.id, card.name, 3)
      const result = state.draw_card(event, 0)[0].cards[0]

      expect(result.position).toEqual(DECK_POSITION)
      expect(result.container).toEqual("hand")
    })

    it("puts card in opponent's hand if socketID is not player's socketID", () => {
      const event = Factory.event.draw_card(card.id, card.name, 4)
      const result = state.draw_card(event, 0)[0].cards[0]

      expect(result.position).toEqual(DECK_POSITION)
      expect(result.container).toEqual("opponent-hand")
    })
  })

  describe('addToEL()', () => {
    it('adds new card to emissions line', () => {
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
      let sc: SpaceCard
      beforeEach(() => {
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
      card.zLevel = 0
      const card2 = new Card(1, "1337", "emissions-line")
      card2.position = [2,2]
      card2.zLevel = 1
      const nonELCard = new Card(2, "honk", "hand")
      state.cards = [card, card2, nonELCard]
      state.emissionsLineCardOrder = [0,1]

      let result = state.rearrangeEL(0)

      const currentTime = 1337
      result = state.rearrangeEL(currentTime)
      let pos1 = getELCardPosition(0, 2)
      let pos2 = getELCardPosition(1, 2)
      expect(result.cards).toEqual([
        Card.transpose(card, { timestamp: currentTime, position: pos1, scale: 0.275 }),
        Card.transpose(card2, { timestamp: currentTime, position: pos2, scale: 0.275 }),
        nonELCard
      ])
    })

    it('puts cards in specified order', () => {
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
      const leftEdge = result.cards.find(c => c.id === 0).transpositions[0].position[0] - cardWidth/2
      const rightEdge = result.cards.find(c => c.id === 5).transpositions[0].position[0] + cardWidth/2

      expect(rightEdge - leftEdge).toEqual(EMISSIONS_LINE_MAX_LENGTH)
    })

    it('hover-zooms card if no card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = new Set([0])

      const currentTime = 1337
      const result = state
        .rearrangeEL(currentTime)
        .cards
        .find(c => c.id === card.id)

      const expected = Card.transpose(card, {
        scale: Card.DEFAULT_SCALE * 2,
        position: EMISSIONS_LINE_POSITION,
        timestamp: currentTime
      })
      expected.zLevel = 999

      expect(result).toEqual(expected)
    })

    it('does not hover-zoom card if card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = new Set([0])
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
      const event = new Event(0, "next_card", {
        card: {
          id: 13,
          name: "blargh"
        }
      })

      const result = state.next_card(event)[0]
      const card = new Card(13, "blargh", "deck")
      card.position = DECK_POSITION

      expect(result.cards).toEqual([card])
      expect(result.next_card).toBeDefined()
    })

    it("replaces existing deck card if exists", () => {
      const card = new Card(13, "blargh", "deck")
      state.cards = [card]

      const event = new Event(0, "next_card", {
        card: {
          id: 1,
          name: "honk"
        }
      })

      const card2 = new Card(1, "honk", "deck")
      card2.position = DECK_POSITION

      const result = state.next_card(event)[0]

      expect(result.cards).toEqual([card2])
    })
  })

  describe('mouse_clicked', () => {
    it('sets selectedCardID to undefined if no card is focused', () => {
      state.selectedCardID = 3
      state.hoveredCardIDs = new Set()

      const event = new Event(0, "mouse_clicked", {})
      const result = state.mouse_clicked(event)[0]

      expect(result.selectedCardID).toEqual(undefined)
    })

    it('sets selectedCardID to card ID if card is focused', () => {
      state.selectedCardID = undefined
      state.cards = [new Card(3, "blargh", "hand")]
      state.hoveredCardIDs = new Set([3])

      const event = new Event(0, "mouse_clicked", {})
      const result = state.mouse_clicked(event)[0]

      expect(result.selectedCardID).toEqual(3)
    })

    it('selects card with ID 0', () => {
      state.selectedCardID = undefined
      state.cards = [new Card(0, "blargh", "hand")]
      state.hoveredCardIDs = new Set([0])

      const event = new Event(0, "mouse_clicked", {})
      const result = state.mouse_clicked(event)[0]

      expect(result.selectedCardID).toEqual(0)
    })
  })

  describe('incorrect_card_placement', () => {
    it('throws specified card into discard pile', () => {
      const card = new Card(7, "blargh", "hand")
      card.rotation = 30
      card.addedRotation = 15
      card.position = [1, 1]
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

      let timePassed = 0
      const currentTime = 1337
      let result = state.incorrect_card_placement(event, timePassed, currentTime)[0]
      expect(result.cards[1]).toEqual(card2)
      const movedCard = result.cards[0]

      expect(movedCard.container).toEqual("discard-pile")
      expect(movedCard.transpositions).toEqual([{
        addedRotation: 0,
        position: DISCARD_PILE_POSITION,
        rotation: 0,
        timestamp: currentTime
      }])
    })

    it('deselects card', () => {
      state.selectedCardID = 7

      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

      let timePassed = 0
      let result = state.incorrect_card_placement(event, timePassed)[0]
      expect(result.selectedCardID).toEqual(undefined)
    })

    it('flips card', () => {
      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "blargh", "emissions-line")

      state.cards = [
        card,
        card2
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

      let timePassed = 0
      let result = state
        .incorrect_card_placement(event, timePassed)[0]
        .cards
        .find(c => c.id === card.id)
      expect(result.flipped).toEqual(true)
    })

    it('rearranges hands', () => {
      const card = new Card(7, "blargh", "hand")
      const card2 = new Card(1, "honk", "hand")
      const card3 = new Card(3, "1337", "opponent-hand")

      state.cards = [
        card,
        card2,
        card3
      ]

      const event = new Event(0, "incorrect_card_placement", { cardID: card.id })

      let result = state
        .incorrect_card_placement(event, ANIMATION_DURATION_MS)[0]

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
