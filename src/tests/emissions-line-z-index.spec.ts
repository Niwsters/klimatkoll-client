import { mouseClickedEvent, mouseMovedEvent } from "../event/event"
import { Card } from "../pages/game/core/card"
import { ANIMATION_DURATION_MS, EMISSIONS_LINE_POSITION } from "../pages/game/core/constants"
import { GameState } from "../pages/game/core/gamestate"
import { Factory } from './test-factory'
import { spec } from './spec'

const currentTime = 1337
const card = new Card(0, "some-card")
const card2 = new Card(1, "other-card")
const card3 = new Card(2, "third-card")

function moveMouse(state: GameState, x: number, y: number): GameState {
  const event = {...mouseMovedEvent(x, y), event_id: 0}
  state = state.mouse_moved(event)[0]
  state = state.update(currentTime + ANIMATION_DURATION_MS)
  return state
}

function getCardById(state: GameState, cardID: number): Card {
  const card = state.cards.find(c => c.id === cardID)
  if (!card) throw new Error("Can't find card")
  return card
}

function cardScale(state: GameState): number {
  return getCardById(state, card.id).scale
}

function otherCardScale(state: GameState): number {
  return getCardById(state, card2.id).scale
}

function getOtherCards(state: GameState) {
  return state.emissionsLine.cards.filter(c => c.id !== card.id)
}

function unique(array: any[]) {
  return [...new Set(array)]
}

function finishAnimation(state: GameState): GameState {
  return state.update(state.lastUpdate).update(state.lastUpdate + ANIMATION_DURATION_MS)
}

function addCard(state: GameState): GameState {
  state = state.new()
  state.emissionsLine = state.emissionsLine.addCard(card, 0, currentTime)
  return state
}

function hoverCard(state: GameState): GameState {
  const [x, y] = [EMISSIONS_LINE_POSITION.x, EMISSIONS_LINE_POSITION.y]
  return moveMouse(state, x, y) 
}

function otherCardScales(state: GameState): number[] {
  return unique(getOtherCards(state).map(c => c.scale))
}

function dontHoverAnyCard(state: GameState): GameState {
  return moveMouse(state, 0, 0)
}

function addHandCard(state: GameState): GameState {
  state = state.new()
  state.hand = state.hand.addCard(card3)
  return finishAnimation(state)
}

function handCard(state: GameState): Card {
  return getCardById(state, card3.id)
}

function hoverHandCard(state: GameState): GameState {
  const card = handCard(state)
  return moveMouse(state, card.position.x, card.position.y)
}

function clickMouse(state: GameState): GameState {
  return state.mouse_clicked({ event_id: 1, ...mouseClickedEvent() })[0]
}

function selectHandCard(state: GameState): GameState {
  return clickMouse(hoverHandCard(state))
}

function emissionsLineZIndexes(state: GameState): number[] {
  return state.emissionsLine.cards.map(c => c.zLevel)
}

export default function main() {
  spec()
    .when(() => Factory.GameState())
    .when(addCard)
    .when(finishAnimation)
    .expect(emissionsLineZIndexes)
    .toEqual([10, 11, 12])
}
