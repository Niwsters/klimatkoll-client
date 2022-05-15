import { Event, EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { EmissionsLine } from "core/emissionsline";
import { Hand } from "core/hand";
import { Position } from "core/position";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { fetchCardData } from "shared/fetch-card-data";
import { getEmissionsLine } from "./emissions-line";
import { getHand } from './hand'
import { getMousePosition } from "./mouse-position";

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function drawCard(cards: Card[]): EventToAdd {
  return {
    event_type: "draw_card",
    payload: { card: cards[0] },
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
  private events: any[] = []

  private async getCards(baseUrl: string) {
    const allCards = await getCards(baseUrl)
    this.events = [...this.events, drawCard(allCards), playCardFromDeck(allCards)]
  }

  private addEvent(event: Event) {
    this.events.push(event)
  }

  get mousePosition(): Position {
    return getMousePosition(this.events)
  }

  get cards(): Card[] {
    return [
      ...this.hand.cards,
      ...this.emissionsLine.cards
    ]
  }

  get hand(): Hand {
    return getHand(this.events, Date.now(), this.mousePosition)
  }

  get emissionsLine(): EmissionsLine {
    return getEmissionsLine(this.events, this.mousePosition, this.hand.selectedCard)
  }

  constructor(services: Services) {
    services.events$.subscribe(event => this.addEvent(event))
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
  }
}
