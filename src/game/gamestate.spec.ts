import { GameState } from './gamestate'
import { Hand, OpponentHand } from './hand'
import { Card, SpaceCard, TransposeGoal } from './card'
import { CardHoveredEvent, CardUnhoveredEvent, Event, EventToAdd, MouseMovedEvent } from '../event/event'
import {
  ANIMATION_DURATION_MS,
  DISCARD_PILE_POSITION,
  DECK_POSITION,
  EMISSIONS_LINE_POSITION
} from './constants'
import { AppConfig } from '../App'

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

  describe('card_played_from_deck', () => {
    const card = new Card(0, "blargh", "emissions-line")
    const card2 = new Card(1, "honk", "emissions-line")
    const card3 = new Card(2, "1337", "emissions-line")

    function playCard(state: GameState, card: Card, position: number): [GameState, EventToAdd[]] {
      const event = new Event(0, 'card_played_from_deck', {
        card: card,
        position: position
      })
      return state.card_played_from_deck(event)
    }

    it('adds card to emissions line', () => {
      state = playCard(state, card, 0)[0]
      expect(state.emissionsLine.cards.map(c => c.id)).toEqual([-1, card.id, -2])
    })

    it('adds card to given position', () => {
      state = playCard(state, card, 0)[0]
      state = playCard(state, card2, 2)[0]
      state = playCard(state, card3, 2)[0]

      const result = state.emissionsLine.cards.filter(c => !c.isSpace).map(c => c.id)
      expect(result).toEqual([card.id, card3.id, card2.id])
    })

    it('flips card', () => {
      card.flipped = false
      state = playCard(state, card, 0)[0]
      expect(state.cards.find(c => c.id === card.id).flipped).toEqual(true)
    })
  })

  describe('card_played_from_hand', () => {
    const card = new Card(0, "blargh", "hand")
    const card2 = new Card(1, "honk", "emissions-line")
    const card3 = new Card(2, "1337", "emissions-line")

    function playCard(state: GameState, card: Card, position: number): [GameState, EventToAdd[]] {
      state.cards = [...state.cards, card]
      state.selectedCardID = card.id
      const event = new Event(0, 'card_played_from_hand', {
        socketID: state.socketID,
        cardID: card.id,
        position: position
      })
      return state.card_played_from_hand(event)
    }

    it('deselects hand card', () => {
      state = playCard(state, card, 0)[0]
      expect(state.selectedCardID).toBe(undefined)
    })

    it('adds card to EL', () => {
      state = playCard(state, card, 0)[0]
      expect(state.emissionsLine.cards.map(c => c.id)).toEqual([-1, card.id, -2])
    })

    it('removes card from hand', () => {
      state = playCard(state, card, 0)[0]
      expect(state.cards.findIndex(c => c.container === "hand")).toEqual(-1)
    })

    it('plays card to given position', () => {
      state = playCard(state, card, 0)[0]
      state = playCard(state, card2, 2)[0]
      state = playCard(state, card3, 2)[0]

      const result = state.emissionsLine.cards.filter(c => !c.isSpace).map(c => c.id)
      expect(result).toEqual([card.id, card3.id, card2.id])
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
      expect(movedCard.transpositions).toEqual([
        {
          position: DISCARD_PILE_POSITION,
          timestamp: currentTime
        },
        {
          rotation: 0,
          timestamp: currentTime
        },
        {
          addedRotation: 0,
          timestamp: currentTime
        }
      ])
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

  describe('Hovering EmissionsLine cards', () => {
    const currentTime = 1337
    const card = new Card(0, "some-card", "emissions-line")

    beforeEach(() => {
      state.emissionsLine = state.emissionsLine.addCard(card, 0, currentTime)
    })

    function moveMouse(state: GameState, x: number, y: number): GameState {
      const event = {...new MouseMovedEvent(x, y), event_id: 0}
      return state.mouse_moved(event, currentTime)[0]
    }

    function getScaleTranspositions(cards: Card[]): TransposeGoal[] {
      return cards
        .reduce((t, c) => [...t, ...c.transpositions], [])
        .filter(t => t.scale ? true : false)
    }

    it("zooms in on emissions line card", () => {
      const [x, y] = EMISSIONS_LINE_POSITION
      state = moveMouse(state, x, y)

      // Zooms in on middle card
      const transpositions = getScaleTranspositions(
        state.emissionsLine.cards.filter(c => c.id === card.id)
      )
      expect(transpositions).toEqual([
        {
          scale: Card.DEFAULT_SCALE * 2,
          timestamp: currentTime
        }
      ])
    })

    it("doesn't zoom in on surrounding cards", () => {
      const [x, y] = EMISSIONS_LINE_POSITION
      state = moveMouse(state, x, y)

      // Doesn't zoom in on surrounding cards
      const transpositions = getScaleTranspositions(
        state.emissionsLine.cards.filter(c => c.id !== card.id)
      )
      expect(transpositions).toEqual([])
    })

    it("zooms out if mouse moves outside emissions line Y bounds", () => {
      const [x, y] = EMISSIONS_LINE_POSITION
      state = moveMouse(state, x, y)

      // Move mouse outside emissions line
      state = moveMouse(state, 0, 0)

      const transpositions = getScaleTranspositions(
        state.emissionsLine.cards.filter(c => c.id === card.id)
      )
      expect(transpositions).toEqual([
        {
          scale: Card.DEFAULT_SCALE * 2,
          timestamp: currentTime
        },
        {
          scale: Card.DEFAULT_SCALE,
          timestamp: currentTime
        },
      ])
    })

    it("zooms in only on the closest card to the mouse", () => {
      const card2 = new Card(1, "other-card", "emissions-line")
      card2.position = [100, 100]
      state.emissionsLine = state.emissionsLine.addCard(card2, 2, currentTime)

      const [x, y] = [card2.position[0], EMISSIONS_LINE_POSITION[1]]
      state = moveMouse(state, x, y)

      let transpositions = getScaleTranspositions(
        state.emissionsLine.cards.filter(c => c.id === card2.id)
      )
      expect(transpositions).toEqual([
        {
          scale: Card.DEFAULT_SCALE * 2,
          timestamp: currentTime
        }
      ])
      transpositions = getScaleTranspositions(
        state.emissionsLine.cards.filter(c => c.id === card.id)
      )
      expect(transpositions).toEqual([
        {
          scale: Card.DEFAULT_SCALE,
          timestamp: currentTime
        }
      ])
    })
  })
})
