import { MouseMovedEvent } from "../event/event"
import { Card } from "../game/card"
import { ANIMATION_DURATION_MS, HAND_POSITION } from "../game/constants"
import { GameState } from "../game/gamestate"
import { Factory } from './test-factory'
import { spec } from './spec'

function moveMouse(state: GameState, x: number, y: number): GameState {
  const event = {...new MouseMovedEvent(x, y), event_id: 0}
  state = state.mouse_moved(event)[0]
  state = state.update(currentTime + ANIMATION_DURATION_MS)
  return state
}

function getCard(state: GameState): Card {
  const found = state.cards.find(c => c.id === card.id)
  if (!found) throw new Error("Card not found")
  return found
}

function scale(state: GameState): number {
  return getCard(state).scaleGoal.scale
}

function rotation(state: GameState): number {
  return getCard(state).rotationGoal.rotation
}

function position(state: GameState): [number, number] {
  return getCard(state).positionGoal.position
}

function positionY(state: GameState): number {
  return position(state)[1]
}

function addCardsToHand(): GameState {
  let state = Factory.GameState()
  state.hand = state.hand.addCard(card)
  state.hand = state.hand.addCard(card2)
  state = state.update(0).update(ANIMATION_DURATION_MS)
  return state
}

function moveMouseToCard(state: GameState): GameState {
  const [x, y] = getCard(state).position
  return moveMouse(state, x, y)
}

function otherCardScale(state: GameState): number {
  const card = state.cards.find(c => c.id === card2.id)
  if (!card) throw new Error("Can't find other card")
  return card.scaleGoal.scale
}

function moveMouseAboveYLimit(state: GameState): GameState {
  const [x, y] = [getCard(state).position[0], 0]
  return moveMouse(state, x, y)
}

const currentTime = 1337
const card = new Card(0, "some-card", "hand")
const card2 = new Card(1, "other-card", "hand")

export default function main() {
  const handWithCards = spec().when(addCardsToHand)

  const hovering = handWithCards
    .when(moveMouseToCard)

  // zooms in on card
  hovering
    .expect(scale)
    .toEqual(Card.DEFAULT_SCALE * 2)

  hovering
    .expect(rotation)
    .toEqual(0)

  hovering
    .expect(positionY)
    .toEqual(HAND_POSITION[1] - 230)

  // doesn't zoom in on other card
  hovering
    .expect(otherCardScale)
    .toEqual(Card.DEFAULT_SCALE)

  // doesn't zoom in if mouse too far from y-axis limit
  handWithCards
    .when(moveMouseAboveYLimit)
    .expect(scale)
    .toEqual(Card.DEFAULT_SCALE)
}
