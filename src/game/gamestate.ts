import { Card } from './card'
import { Hand, OpponentHand } from './hand'
import { CardHoveredEvent, CardUnhoveredEvent, Event, EventToAdd, PlayCardRequestEvent } from '../event/event'
import { AppConfig } from '../App'
import {
  DISCARD_PILE_POSITION,
  DECK_POSITION,
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'

import { EmissionsLine } from './emissionsline'

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  _cards: Card[] = []
  emissionsLineCardOrder: number[] = []
  isMyTurn: boolean = false
  socketID: number = -1
  hoveredCardIDs = new Set<number>()
  selectedCardID?: number
  statusMessage: string = ""
  roomID: string = ""
  config: AppConfig
  emissionsLine: EmissionsLine = new EmissionsLine()

  constructor(config: AppConfig) {
    this.config = config
  }

  get cards(): Card[] {
    return [...this._cards, ...this.emissionsLine.cards]
  }

  set cards(cards: Card[]) {
    this._cards = cards
  }

  private new(): GameState {
    return Object.assign(new GameState(this.config), this)
  }

  update(time: number): GameState {
    let state = this.new()
    state.cards = state.cards.map((card: Card) => Card.update(card, time))
    return state
  }

  addToEL(card: Card, position: number = 0): GameState {
    let state = this.new()

    // Add new card in specified position
    state.emissionsLine = state.emissionsLine.addCard(card, position)

    return state
  }

  private getOrderedEmissionsLine(): Card[] {
    let state = this

    let elCards: Card[] = []
    for (const cardID of state.emissionsLine.cardOrder) {
        const card = state.cards.find(c => c.id === cardID)
        if (!card) throw new Error("Can't find card with ID: " + cardID);
        elCards = [...elCards, card]
    }
    return elCards
  }

  private getEmissionsLineWidth(): number {
    let state = this

    const cardCount = state.emissionsLine.cardOrder.length
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const totalELWidth = cardWidth * cardCount
    let width = cardWidth / 2
    if (totalELWidth > EMISSIONS_LINE_MAX_LENGTH) {
      width = (EMISSIONS_LINE_MAX_LENGTH - cardWidth) / (cardCount-1)
    }
    return width
  }

  private isCardFocused(card: Card): boolean {
    return GameState.getFocusedCardID(this) === card.id
  }

  private isACardSelected(): boolean {
    return this.selectedCardID !== undefined
  }

  private moveELCard(card: Card, i: number, currentTime: number): Card {
    const state = this

    let elCards = state.getOrderedEmissionsLine()
    const cardCount = elCards.length
    const width = state.getEmissionsLineWidth()
    const startOffset = 0 - width*cardCount/2 - width/2


    const x = EMISSIONS_LINE_POSITION[0] + startOffset + width * (i+1)
    const y = EMISSIONS_LINE_POSITION[1]
    return Card.move(card, x, y, currentTime)
  }

  private scaleELCard(card: Card, currentTime: number): Card {
    const state = this

    let scale = Card.DEFAULT_SCALE
    if (
      !card.isSpace &&
      !state.isACardSelected() &&
      state.isCardFocused(card)
    ) {
      scale = Card.DEFAULT_SCALE * 2
    }

    return Card.scale(card, scale, currentTime)
  }

  private transposeELCard(
    card: Card,
    i: number,
    currentTime: number
  ): Card {
    let state = this

    card = state.moveELCard(card, i, currentTime)
    card = state.scaleELCard(card, currentTime)

    return card
  }

  private getELCardZLevel(card: Card, i: number): number {
    let state = this

    let zLevel = i
    if (
      !card.isSpace &&
      state.selectedCardID === undefined &&
      GameState.getFocusedCardID(state) === card.id
    ) {
      zLevel = 999
    }

    return zLevel
  }

  private getSpaceCardName(card: Card): string {
    const state = this

    let name = "space"
    const selectedCard = state.cards.find(c => c.id === state.selectedCardID)
    if (selectedCard !== undefined && state.isCardFocused(card))
      name = selectedCard.name

    return name
  }

  private updateSpaceCard(oldCard: Card): Card {
    let state = this
    let card = {...oldCard}

    card.visible = state.isACardSelected()
    card.name = state.getSpaceCardName(card)

    return card
  }

  private updateELZLevels(): GameState {
    let state = this.new()

    let elCards: Card[] = state.getOrderedEmissionsLine()

    elCards = elCards.map((card: Card, i: number) => {
      return {
        ...card,
        zLevel: state.getELCardZLevel(card, i)
      }
    })

    return GameState.updateCards(state, elCards)
  }

  private updateELSpaceCards(): GameState {
    let state = this.new()

    let elCards = state.getOrderedEmissionsLine()
    elCards = elCards.map((card: Card) => {
      if (card.isSpace)
        return state.updateSpaceCard(card)

      return card
    })

    return GameState.updateCards(state, elCards)
  }

  private transposeELCards(currentTime: number): GameState {
    let state = this.new()

    let elCards = state.getOrderedEmissionsLine()
    elCards = elCards.map((card: Card, i: number) => {
      return state.transposeELCard(card, i, currentTime)
    })

    return GameState.updateCards(state, elCards)
  }

  rearrangeEL(currentTime: number = Date.now()): GameState {
    let state = this.new()

    state = state.updateELZLevels()
    state = state.updateELSpaceCards()
    state = state.transposeELCards(currentTime)

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
      const position = state.emissionsLine.cardOrder.findIndex((cardID: number) => focusedCard.id === cardID)
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

    let events: EventToAdd[] = []
    for (const card of state.cards) {
      if (Card.isMouseHovering(card, mouseX, mouseY) && !state.hoveredCardIDs.has(card.id)) {
        events = [...events, new CardHoveredEvent(card.id)]
        state.hoveredCardIDs.add(card.id)
      } else if (!Card.isMouseHovering(card, mouseX, mouseY) && state.hoveredCardIDs.has(card.id)) {
        events = [...events, new CardUnhoveredEvent(card.id)]
      }
    }

    return [state, events]
  }

  // TODO: Unit test this
  card_hovered(event: CardHoveredEvent, timePassed: number): [GameState, EventToAdd[]] {
    let state = this.new()

    const card = state.cards.find(c => c.id === event.payload.cardID)
    if (!card)
      return [state, []]

    // If hand card is selected, ignore non-space cards
    if (state.selectedCardID) {
      if (card.container === "emissions-line" && !card.isSpace) return [state, []]
    // Else, ignore space cards
    } else {
      if (card.container === "emissions-line" && card.isSpace) return [state, []]
    }


    // If it's the first hovered card, rearrange and trigger animations
    if (state.hoveredCardIDs.size === 1) {
      state = Hand.rearrange(state, timePassed)
      state = state.rearrangeEL()
    }

    return [state, []]
  }

  // TODO: Unit test this
  card_unhovered(event: CardUnhoveredEvent, timePassed: number): [GameState, EventToAdd[]] {
    let state = this.new()

    const card = state.cards.find(c => c.id === event.payload.cardID)
    if (!card)
      return [state, []]

    const previousFocusedCardID = GameState.getFocusedCardID(state)
    state.hoveredCardIDs.delete(card.id)
    const currentFocusedCardID = GameState.getFocusedCardID(state)

    if (previousFocusedCardID !== currentFocusedCardID) {
      state = Hand.rearrange(state, timePassed)
      state = state.rearrangeEL()
    }

    return [state, []]
  }

  incorrect_card_placement(
    event: Event,
    timePassed: number,
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

    state = Hand.rearrange(state, timePassed, currentTime)
    state = OpponentHand.rearrange(state, timePassed, currentTime)

    return [state, []]
  }

  draw_card(event: Event, timePassed: number = Date.now()): [GameState, EventToAdd[]] {
    let state = this.new()
    const server_card = event.payload.card

    if (event.payload.socketID === state.socketID) {
      const card = new Card(server_card.id, server_card.name, "hand")
      card.position = DECK_POSITION
      state.cards = [...state.cards, card]
      state = Hand.rearrange(state, timePassed)
    } else {
      const card = new Card(server_card.id, server_card.name, "opponent-hand")
      card.position = DECK_POSITION
      state.cards = [...state.cards, card]
      state = OpponentHand.rearrange(state, timePassed)
    }

    return [state, []]
  }

  socket_id(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()
    state.socketID = event.payload.socketID
    return [state, []]
  }

  card_played_from_deck(event: Event): [GameState, EventToAdd[]] {
    let state = this.new()

    const serverCard = event.payload.card
    const position = event.payload.position
    state.emissionsLine = state.emissionsLine.addCard(
      new Card(serverCard.id,serverCard.name, "emissions-line"),
      position
    )
    
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

    // Add EL card
    const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line")
    movedCard.position = playedCard.position
    state = state.addToEL(movedCard, position)

    // Remove hand card
    state.cards = state.cards.filter(c => c !== playedCard)

    state = state.rearrangeEL()
    state = Hand.rearrange(state, timePassed)
    state = OpponentHand.rearrange(state, timePassed)

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

  private static updateCards(state: GameState, updated: Card[]): GameState {
    state.cards = state.cards.map(card => {
      const updatedCard = updated.find(c => c.id === card.id)

      return updatedCard ? updatedCard : card
    })

    return state
  }
}
