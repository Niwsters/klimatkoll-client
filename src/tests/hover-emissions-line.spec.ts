import { MouseMovedEvent } from "../event/event"
import { Card } from "../game/card"
import { ANIMATION_DURATION_MS, EMISSIONS_LINE_POSITION } from "../game/constants"
import { GameState } from "../game/gamestate"
import { Factory } from './test-factory'
import { spec } from './spec'

function moveMouse(state: GameState, x: number, y: number): GameState {
  const event = {...new MouseMovedEvent(x, y), event_id: 0}
  state = state.mouse_moved(event)[0]
  state = state.update(currentTime + ANIMATION_DURATION_MS)
  return state
}

function getCardScale(state: GameState, cardID: number) {
  return state.emissionsLine.cards.find(c => c.id === cardID)?.scale
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

const currentTime = 1337
const card = new Card(0, "some-card")

export default function main() {
  const test = spec()
    .when(() => {
      const state = Factory.GameState()
      state.emissionsLine = state.emissionsLine.addCard(card, 0, currentTime)
      return state
    })

  const hovering = test
    .when((state: GameState) => {
      const [x, y] = [EMISSIONS_LINE_POSITION.x, EMISSIONS_LINE_POSITION.y]
      return moveMouse(state, x, y)
    })
    .when(finishAnimation)

  // zooms in on emissions line card
  hovering
    .expect((state: GameState) => getCardScale(state, card.id))
    .toEqual(Card.DEFAULT_SCALE * 2)

  // doesn't zoom in on surrounding cards
  hovering
    .expect((state: GameState) => unique(getOtherCards(state).map(c => c.scale)))
    .toEqual([Card.DEFAULT_SCALE])

  // zooms out if mouse moves outside emissions line Y bounds
  hovering
    .when((state: GameState) => moveMouse(state, 0, 0))
    .when(finishAnimation)
    .expect((state: GameState) => getCardScale(state, card.id))
    .toEqual(Card.DEFAULT_SCALE)

  // zooms in only on the closest card to the mouse
  const card2 = new Card(1, "other-card")
  const twoCards = test
    .when((state: GameState) => {
      state = state.new()
      card2.position = EMISSIONS_LINE_POSITION
      state.emissionsLine = state.emissionsLine.addCard(card2, 2, currentTime)

      const [x, y] = [card2.position.x, EMISSIONS_LINE_POSITION.y]
      return moveMouse(state, x, y)
    })
    .when(finishAnimation)
  twoCards.expect((state: GameState) => getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE * 2)
  twoCards.expect((state: GameState) => getCardScale(state, card2.id)).toEqual(Card.DEFAULT_SCALE)

  // zooms in only if mouse is within emissions line x-axis
  test
    .when((state: GameState) => {
      const y = EMISSIONS_LINE_POSITION.y
      return moveMouse(state, 0, y)
    })
    .expect((state: GameState) => getCardScale(state, card.id))
    .toEqual(Card.DEFAULT_SCALE)
}
