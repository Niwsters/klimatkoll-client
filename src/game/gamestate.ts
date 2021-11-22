import { Card, SpaceCard, TransposeGoal } from './card'
import { Hand, OpponentHand } from './hand'
import { Event } from './event'
import { TextConfig } from '../models/text-config'
import {
  DISCARD_PILE_POSITION,
  DECK_POSITION,
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'

export interface ServerCommand {
  context: string
  type: string
  payload: any
}

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []
  emissionsLineCardOrder: number[] = []
  isMyTurn: boolean = false
  socketID: number = -1
  hoveredCardIDs = new Set<number>()
  selectedCardID?: number
  statusMessage: string = ""
  roomID: string = ""

  new(params: any = {}): GameState {
    return Object.assign(new GameState(), this, params)
  }

  addToEL(card: Card, position: number = 0): GameState {
    let state = this.new()

    // Flip card
    card.flipped = true

    // Add new card in specified position
    state.cards.push(card)
    state.emissionsLineCardOrder = [
      ...state.emissionsLineCardOrder.slice(0, position+1),
      card.id,
      ...state.emissionsLineCardOrder.slice(position+1, state.emissionsLineCardOrder.length)
    ]

    // Reset space cards
    state.emissionsLineCardOrder = state.emissionsLineCardOrder
      .filter(cardID => cardID >= 0)
      .reduce((elCardOrder, cardID, i) => {
        return [
          ...elCardOrder,
          ...[cardID, -1-(i+1)]
        ]
      }, [-1])

    state.cards = state.cards.filter(c => !c.isSpace)
    const missingSpaceCards = state.emissionsLineCardOrder
      .filter(cardID => cardID < 0)
      .reduce((spaceCards: Card[], cardID: number, i: number) => {
        const exists = state.cards.findIndex(c => c.id === cardID) > -1

        if (exists) return spaceCards

        return [
          ...spaceCards,
          new SpaceCard(-1-i)
        ]
      }, [])
    state.cards = [...state.cards, ...missingSpaceCards]

    return state
  }

  rearrangeEL(timePassed: number): GameState {
    let state = this.new()

    let elCards = state.emissionsLineCardOrder
      .reduce((cards: Card[], cardID: number) => {
        const card = state.cards.find(c => c.id === cardID)
        if (!card) throw new Error("Can't find card with ID: " + cardID)
        return [...cards, card]
      }, [])
    const cardCount = elCards.length
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const totalELWidth = cardWidth * cardCount
    let width = cardWidth / 2
    if (totalELWidth > EMISSIONS_LINE_MAX_LENGTH) {
      width = (EMISSIONS_LINE_MAX_LENGTH - cardWidth) / (cardCount-1)
    }
    const startOffset = 0 - width*cardCount/2 - width/2

    elCards = elCards.map((card: Card, i: number) => {
      const goal: TransposeGoal = {}

      goal.scale = Card.DEFAULT_SCALE
      goal.position = [
        EMISSIONS_LINE_POSITION[0] + startOffset + width * (i+1),
        EMISSIONS_LINE_POSITION[1]
      ]

      card.zLevel = i
      card.visible = true
      if (card.isSpace) {
        if (state.selectedCardID === undefined) card.visible = false

        card.name = "space"
        const selectedCard = state.cards.find(c => c.id === state.selectedCardID)
        if (selectedCard !== undefined && GameState.getFocusedCardID(state) === card.id) {
          card.name = selectedCard.name
        }
      } else {
        if (state.selectedCardID === undefined && GameState.getFocusedCardID(state) === card.id) {
          goal.scale = Card.DEFAULT_SCALE * 2
          card.zLevel = 999
        }
      }

      return Card.transpose(card, goal, timePassed)
    })

    return GameState.updateCards(state, elCards)
  }

  static getFocusedCardID(state: GameState): number | undefined {
    return Array.from(state.hoveredCardIDs)[0]
  }

  static getFocusedCard(state: GameState): Card | undefined {
    const id = GameState.getFocusedCardID(state)
    return state.cards.find(c => c.id === id)
  }


  static getSelectedCard(state: GameState): Card | undefined {
    return state.cards.find(c => c.id === state.selectedCardID)
  }

  mouse_clicked(event: Event, timePassed: number): GameState {
    const focusedCardID = GameState.getFocusedCardID(this)
    let selectedCardID = undefined
    if (focusedCardID !== undefined) {
      const card = this.cards.find(c => c.id === focusedCardID)

      if (card && card.container === "hand") {
        selectedCardID = focusedCardID
      }
    }

    return this.new({ selectedCardID: selectedCardID })
               .rearrangeEL(timePassed)
  }

  next_card(event: Event, timePassed: number): GameState {
    // remove existing deck card
    const cards = this.cards.filter(c => c.container !== "deck")

    const serverCard = event.payload.card
    const card = new Card(serverCard.id, serverCard.name, "deck")
    card.position = DECK_POSITION

    cards.push(card)

    return this.new({ cards: cards })
  }

  incorrect_card_placement(event: Event, timePassed: number): GameState {
    let state = this.new()

    const goal: TransposeGoal = {
      position: DISCARD_PILE_POSITION,
      rotation: 0,
      addedRotation: 0
    }

    state.cards = state.cards.map(card => {
      if (card.id !== event.payload.cardID) return card;

      card.flipped = true

      return Card.transpose({
        ...card,
        container: "discard-pile"
      }, goal, timePassed)
    })

    state.selectedCardID = undefined

    state = Hand.rearrange(state, timePassed)
    state = OpponentHand.rearrange(state, timePassed)

    return state
  }

  draw_card(event: Event, timePassed: number) {
    let state = this.new()
    // { socketID, card }
    // Draw card into correct hand
    const server_card = event.payload.card

    if (event.payload.socketID === state.socketID) {
      const card = new Card(server_card.id, server_card.name, "hand")
      card.position = DECK_POSITION
      state.cards.push(card)
      state = Hand.rearrange(state, timePassed)
    } else {
      const card = new Card(server_card.id, server_card.name, "opponent-hand")
      card.position = DECK_POSITION
      state.cards.push(card)
      state = OpponentHand.rearrange(state, timePassed)
    }

    return state
  }

  static updateCards(state: GameState, updated: Card[]): GameState {
    state.cards = state.cards.map(card => {
      const updatedCard = updated.find(c => c.id === card.id)

      return updatedCard ? updatedCard : card
    })

    return state
  }

  static handleEvent(
    oldState: GameState,
    event: Event,
    text: TextConfig,
    currentTime: number = Date.now(),
  ): GameState {
    let state = { ...oldState };

    const timePassed = currentTime - event.timestamp
    switch(event.event_type) {
      case "waiting_for_players":
        // No payload
        state.statusMessage = text.waitingForPlayer
        break
      case "playing":
        // No payload
        break
      case "draw_card": {
        // { socketID, card }
        state = state.draw_card(event, currentTime)
        break
      }
      case "return_opponent_hand":
        // No payload
        break
      case "card_played_from_deck": {
        // { card, position }
        const serverCard = event.payload.card
        const position = event.payload.position
        state = EmissionsLine.add(
          state,
          new Card(serverCard.id, serverCard.name, "emissions-line"),
          position)
        state = EmissionsLine.rearrange(state, timePassed)
        break
      }
      case "card_played_from_hand":
        // { socketID, cardID, position }
        // Move card to emissions line
        const playedCard = state.cards.find(c => c.id === event.payload.cardID)
        const position = event.payload.position
        if (!playedCard) {
          throw new Error("Played card does not exist with ID: " + event.payload.cardID)
        }
        state.selectedCardID = undefined
        const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line")
        movedCard.position = playedCard.position
        state.cards = state.cards.filter(c => c !== playedCard)
        state = EmissionsLine.add(state, movedCard, position)
        state = EmissionsLine.rearrange(state, timePassed)
        state = Hand.rearrange(state, timePassed)
        state = OpponentHand.rearrange(state, timePassed)

        break
      case "incorrect_card_placement": {
        // { cardID, socketID }
        state = GameState.incorrect_card_placement(state, event, timePassed)
        break
      }
      case "player_turn":
        // { socketID }
        if (state.socketID === event.payload.socketID) {
          state.isMyTurn = true
          state.statusMessage = text.yourTurn
        } else {
          state.isMyTurn = false
          state.statusMessage = text.opponentsTurn
        }
        break
      case "game_won":
        // { socketID }
        if (state.socketID === event.payload.socketID) {
          state.statusMessage = text.youWon
        } else {
          state.statusMessage = text.youLost
        }
        break
      case "vote_new_game":
        // { socketID }
        break
      case "next_card":
        // { card }
        state = GameState.nextCard(state, event, timePassed)
        break
      case "card_hovered": {
        const card_id = event.payload.card_id
        state.hoveredCardIDs.add(card_id)
        state = Hand.rearrange(state, timePassed)
        state = EmissionsLine.rearrange(state, timePassed)
        break
      }
      case "card_unhovered": {
        const card_id = event.payload.card_id
        state.hoveredCardIDs.delete(card_id)
        state = Hand.rearrange(state, timePassed)
        state = EmissionsLine.rearrange(state, timePassed)
        break
      }
      case "mouse_clicked": {
        state = GameState.mouseClicked(state, event, timePassed)
        break
      }
      case "socket_id": {
        state.socketID = event.payload.socketID
        break
      }
    }

    return state
  }

  static fromEvents(
    events: Event[],
    text: TextConfig,
    currentTime: number = Date.now(),
  ): GameState {
    return events.reduce((state: GameState, event: Event) => {
      const timePassed = currentTime - event.timestamp
      switch(event.event_type) {
        case "waiting_for_players":
          // No payload
          state.statusMessage = text.waitingForPlayer
          break
        case "playing":
          // No payload
          /*
          const sc = new SpaceCard(state)
          state.cards.push(sc)
          state.emissionsLineCardOrder.push(sc.id)
          */
          break
        case "draw_card": {
          // { socketID, card }
          // Draw card into correct hand
          const server_card = event.payload.card

          if (event.payload.socketID === state.socketID) {
            const card = new Card(server_card.id, server_card.name, "hand")
            card.position = DECK_POSITION
            state.cards.push(card)
            state = Hand.rearrange(state, timePassed)
          } else {
            const card = new Card(server_card.id, server_card.name, "opponent-hand")
            card.position = DECK_POSITION
            state.cards.push(card)
            state = OpponentHand.rearrange(state, timePassed)
          }

          break
        }
        case "return_opponent_hand":
          // No payload
          break
        case "card_played_from_deck": {
          // { card, position }
          const serverCard = event.payload.card
          const position = event.payload.position
          state = EmissionsLine.add(
            state,
            new Card(serverCard.id, serverCard.name, "emissions-line"),
            position)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_played_from_hand":
          // { socketID, cardID, position }
          // Move card to emissions line
          const playedCard = state.cards.find(c => c.id === event.payload.cardID)
          const position = event.payload.position
          if (!playedCard) {
            throw new Error("Played card does not exist with ID: " + event.payload.cardID)
          }
          state.selectedCardID = undefined
          const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line")
          movedCard.position = playedCard.position
          state.cards = state.cards.filter(c => c !== playedCard)
          state = EmissionsLine.add(state, movedCard, position)
          state = EmissionsLine.rearrange(state, timePassed)
          state = Hand.rearrange(state, timePassed)
          state = OpponentHand.rearrange(state, timePassed)

          break
        case "incorrect_card_placement": {
          // { cardID, socketID }
          state = GameState.incorrect_card_placement(state, event, timePassed)
          break
        }
        case "player_turn":
          // { socketID }
          if (state.socketID === event.payload.socketID) {
            state.isMyTurn = true
            state.statusMessage = text.yourTurn
          } else {
            state.isMyTurn = false
            state.statusMessage = text.opponentsTurn
          }
          break
        case "game_won":
          // { socketID }
          if (state.socketID === event.payload.socketID) {
            state.statusMessage = text.youWon
          } else {
            state.statusMessage = text.youLost
          }
          break
        case "vote_new_game":
          // { socketID }
          break
        case "next_card":
          // { card }
          state = GameState.nextCard(state, event, timePassed)
          break
        case "card_hovered": {
          const card_id = event.payload.card_id
          state.hoveredCardIDs.add(card_id)
          state = Hand.rearrange(state, timePassed)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_unhovered": {
          const card_id = event.payload.card_id
          state.hoveredCardIDs.delete(card_id)
          state = Hand.rearrange(state, timePassed)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "mouse_clicked": {
          state = GameState.mouseClicked(state, event, timePassed)
          break
        }
        case "socket_id": {
          state.socketID = event.payload.socketID
          break
        }
      }

      return state
    }, new GameState())
  }
}
