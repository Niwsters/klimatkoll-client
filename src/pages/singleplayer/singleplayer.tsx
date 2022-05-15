import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { Hand } from "core/hand";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { fetchCardData } from "shared/fetch-card-data";

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function draw_card(hand: Hand, event: any) {
  return hand.addCard(event.payload.card).update(event.timestamp, 0, 0)
}

type HandEventHandler = (hand: Hand, event: any) => Hand

type HandEventHandlers = {
  [event_type: string]: HandEventHandler
}

const eventHandlers: HandEventHandlers = {
  draw_card
}

function handleEvent(hand: Hand, event: any): Hand {
  return eventHandlers[event.event_type](hand, event)
}

function getHand(events: any[]): Hand {
  return events.reduce(handleEvent, new Hand())
}

function drawCard(cards: Card[]): any {
  return {
    event_type: "draw_card",
    payload: { card: cards[0] },
    timestamp: Date.now()
  }
}

type EventStreams = { [stream: string]: EventToAdd[] }

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;

  private events: EventStreams = {
    'hand': []
  }

  private async getCards(baseUrl: string) {
    const allCards = await getCards(baseUrl)
    this.events['hand'] = [drawCard(allCards)]
  }

  get cards(): Card[] {
    return [...this.hand.cards]
  }

  get hand(): Hand {
    return getHand(this.events['hand']).update(Date.now(), 0, 0)
  }

  constructor(services: Services) {
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
  }
}
