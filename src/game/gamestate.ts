import { Card } from './card'
import { Hand } from './hand'
import { OpponentHand } from './opponent-hand'
import { Event, EventToAdd, PlayCardRequestEvent } from '../event/event'
import { AppConfig } from '../App'
import {
  DISCARD_PILE_POSITION,
  DECK_POSITION
} from './constants'

import { EmissionsLine } from './emissionsline'

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  _cards: Card[] = []
  isMyTurn: boolean = false
  socketID: number = -1
  hoveredCardIDs = new Set<number>()
  selectedCardID?: number
  statusMessage: string = ""
  roomID: string = ""
  config: AppConfig
  private mouseX: number = 0
  private mouseY: number = 0
  emissionsLine: EmissionsLine = new EmissionsLine()
  opponentHand: OpponentHand = new OpponentHand()
  hand: Hand = new Hand()

  constructor(config: AppConfig) {
    this.config = config
  }

  get cards(): Card[] {
    return [...this._cards, ...this.emissionsLine.cards, ...this.opponentHand.cards, ...this.hand.cards]
  }

  set cards(cards: Card[]) {
    this._cards = cards
  }

  private new(): GameState {
    return Object.assign(new GameState(this.config), this)
  }

  update(time: number): GameState {
    let state = this.new()

    state.cards = state._cards.map((card: Card) => Card.update(card, time))

    state.emissionsLine = state.emissionsLine.update(time)
    state.emissionsLine = state.emissionsLine.mouse_moved(state.mouseX, state.mouseY, time)

    state.hand = state.hand.rearrange(time, GameState.getFocusedCardID(state))
    state.opponentHand = state.opponentHand.update(time)

    return state
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

  game_won(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    const text = this.config.text

    if (state.socketID === event.payload.socketID) {
      state.statusMessage = text.youWon
    } else {
      state.statusMessage = text.youLost
    }

    return [state, []]
  }

  mouse_clicked(_: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    const focusedCard = GameState.getFocusedCard(this)
    const events: EventToAdd[] = []

    // If card is selected and space card is focused, play card
    if (state.isMyTurn && state.selectedCardID !== undefined && focusedCard !== undefined && focusedCard.isSpace) {
      const position = state.emissionsLine.cards.findIndex(card => focusedCard.id === card.id)
      events.push(new PlayCardRequestEvent(state.selectedCardID, position))
    }

    // Focus/unfocus card
    let selectedCardID = undefined
    if (focusedCard !== undefined) {
      const card = this.cards.find(c => c.id === focusedCard.id)

      if (card && card.container === "hand") {
        selectedCardID = focusedCard.id
      }
    }

    state.selectedCardID = selectedCardID
    return [state, events]
  }

  next_card(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()

    // remove existing deck card
    let cards = this.cards.filter(c => c.container !== "deck")

    const serverCard = event.payload.card
    const card = new Card(serverCard.id, serverCard.name, "deck")
    card.position = DECK_POSITION

    cards = [...cards, card]

    state.cards = cards

    return [state, []]
  }

  mouse_moved(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()

    const mouseX = event.payload.mouseX
    const mouseY = event.payload.mouseY
    state.mouseX = mouseX
    state.mouseY = mouseY

    return [state, []]
  }

  incorrect_card_placement(
    event: Event,
    currentTime: number = Date.now()
  ): [GameState, EventToAdd[]] {
    let state = this.new()

    state.cards = state.cards.map(card => {
      card = {...card}

      if (card.id !== event.payload.cardID) return card;

      const [x, y] = DISCARD_PILE_POSITION
      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, 0, currentTime)
      card = Card.rotateLocal(card, 0, currentTime)

      card.flipped = true
      card.container = "discard-pile"

      return card
    })

    state.selectedCardID = undefined

    return [state, []]
  }

  draw_card(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    const server_card = event.payload.card

    if (event.payload.socketID === state.socketID) {
      const card = new Card(server_card.id, server_card.name, "hand")
      card.position = DECK_POSITION
      state.hand = state.hand.addCard(card)
    } else {
      const card = new Card(server_card.id, server_card.name, "opponent-hand")
      card.position = DECK_POSITION
      state.opponentHand = state.opponentHand.addCard(card)
    }

    return [state, []]
  }

  socket_id(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    state.socketID = event.payload.socketID
    return [state, []]
  }

  card_played_from_deck(event: Event, currentTime: number = Date.now()): [GameState, EventToAdd[]] {
    let state = this.new()

    const serverCard = event.payload.card
    const position = event.payload.position

    const card = new Card(serverCard.id, serverCard.name, "emissions-line")
    state.emissionsLine = state.emissionsLine.addCard(card, position, currentTime)
    return [state, []]
  }

  card_played_from_hand(event: Event, timePassed: number = Date.now()): [GameState, EventToAdd[]] {
    let state = this.new()
    // { socketID, cardID, position }
    // Move card to emissions line
    const playedCard = state.cards.find(c => c.id === event.payload.cardID)
    if (!playedCard) {
      throw new Error("Played card does not exist with ID: " + event.payload.cardID)
    }

    const position = event.payload.position

    // Deselect hand card
    state.selectedCardID = undefined

    // Remove hand card
    state.cards = state.cards.filter(c => c !== playedCard)

    // Add EL card
    const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line")
    movedCard.position = playedCard.position
    state.emissionsLine = state.emissionsLine.addCard(movedCard, position, timePassed)

    return [state, []]
  }

  player_turn(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    const text = this.config.text

    if (state.socketID === event.payload.socketID) {
      state.isMyTurn = true
      state.statusMessage = text.yourTurn
    } else {
      state.isMyTurn = false
      state.statusMessage = text.opponentsTurn
    }

    return [state, []]
  }
}
