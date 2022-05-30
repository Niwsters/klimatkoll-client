import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { Game } from "core/game";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { SPServer } from './server'

const SP_SOCKET_ID = 1;

function drawCard(cards: Card[], socketID: number): EventToAdd {
  const cardID = Math.floor(Math.random() * cards.length)

  return {
    event_type: "draw_card",
    payload: { card: cards[cardID], socketID },
    timestamp: Date.now()
  }
}

function playCardFromDeck(cards: Card[]): EventToAdd {
  const cardID = Math.floor(Math.random() * cards.length)
  return {
    event_type: "card_played_from_deck",
    payload: { card: cards[cardID] },
    timestamp: Date.now()
  }
}

type NoEvent = undefined;
const NO_EVENT: NoEvent = undefined

function playCardFromHand(cardID: number, position: number): EventToAdd {
  return {
    event_type: "card_played_from_hand",
    payload: { cardID: cardID, socketID: SP_SOCKET_ID, position: position },
    timestamp: Date.now()
  }
}

function playCardRequest(deck: Card[], event: EventToAdd): EventToAdd[] {
  return [
    playCardFromHand(event.payload.cardID, event.payload.position),
    drawCard(deck, SP_SOCKET_ID)
  ]
}

function handleGameEvent(deck: Card[], event: EventToAdd): EventToAdd[] | NoEvent {
  switch (event.event_type) {
    case "play_card_request":
      return playCardRequest(deck, event)
    default:
      return NO_EVENT
  }
}

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  private game: Game
  private server: SPServer = new SPServer()
  private readonly socketID: number = SP_SOCKET_ID

  private get deck(): Card[] {
    return this.server.deck
  }

  constructor(services: Services) {
    services.events$.subscribe(event => this.addEvent(event))
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)

    this.game = new Game(services.text, this.socketID)
    this.game.events$.subscribe(this.onGameEvent.bind(this))

    this.server.events$.subscribe(this.onServerEvent.bind(this))

    setInterval(() => this.game.update(Date.now()), 1000/60)
  }

  private onServerEvent(event: EventToAdd) {
    console.log(`Server event: ${JSON.stringify(event)}`)
    this.addEvent(event)
  }

  private onGameEvent(event: EventToAdd) {
    console.log(`Game event: ${JSON.stringify(event)}`)
    this.addEvent(event)
      /*
    const result = handleGameEvent(this.deck, event)
    if (result !== NO_EVENT) {
      result.forEach(event => this.addEvent(event))
    }
       */
  }

  private async getCards(baseUrl: string) {
    await this.server.fetchDeck(baseUrl)
    this.game.handleEvent(drawCard(this.deck, this.socketID) as any)
    this.game.handleEvent(playCardFromDeck(this.deck) as any)
  }

  private addEvent(event: EventToAdd) {
    this.game.handleEvent(event as any)
    this.server.handleEvent(event)
  }

  get cards(): Card[] {
    return [
      ...this.game.state.cards
    ]
  }
}
