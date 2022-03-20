import { MouseClickedEvent, MouseMovedEvent } from '../event/event'
import { Card } from '../game/card'
import { ANIMATION_DURATION_MS } from '../game/constants'
import { GameState } from '../game/gamestate'
import { spec } from './spec'
import { Factory } from './test-factory'

const card = new Card(0, "some-card")
const card2 = new Card(1, "other-card")
const card3 = new Card(2, "third-card")

function addHandCards(state: GameState): GameState {
  state = state.new()
  state.hand = state.hand.addCard(card)
  state.hand = state.hand.addCard(card2)
  return finishAnimations(state)
}

function moveMouse(state: GameState, x: number, y: number): GameState {
  const event = { event_id: 0, ...new MouseMovedEvent(x, y) }
  state = state.mouse_moved(event)[0]
  return state
}

function dontHoverHandCard(state: GameState): GameState {
  state = moveMouse(state, 0, 0)
  return finishAnimations(state)
}

function hoverHandCard(state: GameState): GameState {
  const { x, y } = getCard(state).position
  state = moveMouse(state, x, y)
  return finishAnimations(state)
}

function hoverOtherCard(state: GameState): GameState {
  const { x, y } = getOtherCard(state).position
  state = moveMouse(state, x, y)
  return finishAnimations(state)
}

function finishAnimations(state: GameState): GameState {
  return state.update(state.lastUpdate).update(state.lastUpdate + ANIMATION_DURATION_MS)
}

function clickMouse(state: GameState): GameState {
  return state.mouse_clicked({ event_id: 1, ...new MouseClickedEvent()})[0]
}

function getCardById(state: GameState, cardID: number): Card {
  const found: Card | undefined = state.cards.find(c => c.id === cardID)
  if (!found) throw new Error("Could not find card")
  return found
}

function getCard(state: GameState): Card {
  return getCardById(state, card.id)
}

function isCardSelected(state: GameState): boolean {
  return getCard(state).selected
}

function getOtherCard(state: GameState): Card {
  return getCardById(state, card2.id)
}

function isOtherCardSelected(state: GameState): boolean {
  return getOtherCard(state).selected
}

function areSpaceCardsVisible(state: GameState): boolean {
  return state.cards.filter(c => c.isSpace).every(c => c.visible)
}

function addEmissionsLineCard(state: GameState): GameState {
  state = state.new()
  state.emissionsLine =  state.emissionsLine.addCard(card3, 0, state.lastUpdate)
  return state
}

export default function() {
  const handCardAdded = spec()
    .when(() => Factory.GameState())
    .when(addHandCards)
    .when(addEmissionsLineCard)

  handCardAdded.expect(areSpaceCardsVisible).toEqual(false)

  handCardAdded
    .when(dontHoverHandCard)
    .when(clickMouse)
    .expect(isCardSelected)
    .toEqual(false)

  const selected = handCardAdded
    .when(hoverHandCard)
    .when(clickMouse)
    .when(finishAnimations)

  selected.expect(isCardSelected).toEqual(true)
  selected.expect(isOtherCardSelected).toEqual(false)
  selected.expect(areSpaceCardsVisible).toEqual(true)

  const otherCardSelected = selected
    .when(hoverOtherCard)
    .when(clickMouse)

  otherCardSelected.expect(isCardSelected).toEqual(false)
  otherCardSelected.expect(isOtherCardSelected).toEqual(true)
}
