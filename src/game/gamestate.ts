import { Card } from './card'
import { Hand } from './hand'
import { OpponentHand } from './opponent-hand'
import { Event, EventToAdd } from '../event/event'
import { AppConfig } from '../App'
import {
  DECK_POSITION
} from './constants'

import { EmissionsLine } from './emissionsline'
import { Deck } from './deck'
import { DiscardPile } from './discard-pile'

export class GameState {
  isMyTurn: boolean = false
  socketID: number = -1
  statusMessage: string = ""
  roomID: string = ""
  lastUpdate: number = 0

  config: AppConfig
  emissionsLine: EmissionsLine = new EmissionsLine()
  opponentHand: OpponentHand = new OpponentHand()
  hand: Hand = new Hand()
  deck: Deck = new Deck()
  discardPile: DiscardPile = new DiscardPile()

  private mouseX: number = 0
  private mouseY: number = 0

  new(): GameState {
    return Object.assign(new GameState(this.config), this)
  }

  private removeHandCard(card: Card): GameState {
    let state = this.new()

    state.hand = state.hand.removeCard(card)
    state.opponentHand = state.opponentHand.removeCard(card)

    return state
  }

  constructor(config: AppConfig) {
    this.config = config
  }

  get cards(): Card[] {
    return [
      ...this.emissionsLine.cards,
      ...this.opponentHand.cards,
      ...this.hand.cards,
      ...this.deck.cards,
      ...this.discardPile.cards
    ]
  }

  update(time: number): GameState {
    let state = this.new()

    state.hand = state.hand.update(time, state.mouseX, state.mouseY)
    state.emissionsLine = state.emissionsLine.update(time, state.mouseX, state.mouseY, state.hand.selectedCard)
    state.opponentHand = state.opponentHand.update(time)
    state.discardPile = state.discardPile.update(time)
    state.lastUpdate = time

    return state
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
    
    state.hand = state.hand.mouseClicked(this.mouseX, this.mouseY)
    state.emissionsLine = state.emissionsLine.mouseClicked(state.hand.selectedCard)

    return [state, []]
  }

  next_card(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()

    const serverCard = event.payload.card
    const card = new Card(serverCard.id, serverCard.name)
    card.position = DECK_POSITION

    state.deck = state.deck.setTopCard(card)

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

    let card = state.cards.find(card => card.id === event.payload.cardID)
    if (!card)
      return [state, []]

    state = state.removeHandCard(card)
    state.discardPile = state.discardPile.setTopCard(card, currentTime)

    return [state, []]
  }

  draw_card(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    const server_card = event.payload.card

    if (event.payload.socketID === state.socketID) {
      const card = new Card(server_card.id, server_card.name)
      card.position = DECK_POSITION
      state.hand = state.hand.addCard(card)
    } else {
      const card = new Card(server_card.id, server_card.name)
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

    const card = new Card(serverCard.id, serverCard.name)
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

    // Remove hand card
    state = state.removeHandCard(playedCard)

    // Add EL card
    const movedCard = new Card(playedCard.id, playedCard.name)
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
