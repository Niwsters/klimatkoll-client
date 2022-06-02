import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { Game } from "core/game";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { SPServer } from './server'
import { SP_SOCKET_ID } from "core/constants";

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  private game: Game
  private server: SPServer = new SPServer()
  private readonly socketID: number = SP_SOCKET_ID

  constructor(services: Services) {
    services.events$.subscribe(event => this.addEvent(event))

    this.game = new Game(services.text, this.socketID)
    this.game.events$.subscribe(this.onGameEvent.bind(this))

    this.server.events$.subscribe(this.onServerEvent.bind(this))

    setInterval(() => this.game.update(Date.now()), 1000/60)

    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
  }

  private onServerEvent(event: EventToAdd) {
    this.addEvent(event)
  }

  private onGameEvent(event: EventToAdd) {
    this.addEvent(event)
  }

  private async getCards(baseUrl: string) {
    await this.server.fetchDeck(baseUrl)
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
