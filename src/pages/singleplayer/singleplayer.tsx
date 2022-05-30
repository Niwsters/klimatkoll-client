import { Event, EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { Game } from "core/game";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { fetchCardData } from "shared/fetch-card-data";

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function drawCard(cards: Card[], socketID: number): EventToAdd {
  return {
    event_type: "draw_card",
    payload: { card: cards[0], socketID },
    timestamp: Date.now()
  }
}

function playCardFromDeck(cards: Card[]): EventToAdd {
  return {
    event_type: "card_played_from_deck",
    payload: { card: cards[1] },
    timestamp: Date.now()
  }
}

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  private game: Game
  private socketID: number

  constructor(services: Services) {
    services.events$.subscribe(event => this.addEvent(event))
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
    this.socketID = services.socketID
    this.game = new Game(services.text, this.socketID)

    setInterval(() => this.game.update(Date.now()), 1000/60)
  }

  private async getCards(baseUrl: string) {
    const allCards = await getCards(baseUrl)
    this.game.handleEvent(drawCard(allCards, this.socketID) as any)
    this.game.handleEvent(playCardFromDeck(allCards) as any)
  }

  private addEvent(event: Event) {
    this.game.handleEvent(event)
  }

  get cards(): Card[] {
    return [
      ...this.game.state.cards
    ]
  }
}
