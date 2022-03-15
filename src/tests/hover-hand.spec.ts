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

function getCard(state: GameState, cardID: number) {
  const found = state.cards.find(c => c.id === cardID)
  if (!found) throw new Error("Card not found")
  return found
}

function getMainCard(state: GameState): Card {
  return getCard(state, card.id)
}

function scale(state: GameState): number {
  return getMainCard(state).scaleGoal.scale
}

function rotation(state: GameState): number {
  return getMainCard(state).rotationGoal.rotation
}

function position(state: GameState): [number, number] {
  return getMainCard(state).positionGoal.position
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
  const [x, y] = getMainCard(state).position
  return moveMouse(state, x, y)
}

function otherCardScale(state: GameState): number {
  const card = getCard(state, card2.id)
  return card.scaleGoal.scale
}

function moveMouseAboveYLimit(state: GameState): GameState {
  const [x, y] = [getMainCard(state).position[0], 0]
  return moveMouse(state, x, y)
}

function handWidth(state: GameState): number {
  const leftCard = state.cards[0]
  const rightCard = state.cards[state.cards.length - 1]
  return rightCard.position[0] - leftCard.position[0] + Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
}

function moveMouseLeftOfHand(state: GameState): GameState {
  const [x, y] = [HAND_POSITION[0] - handWidth(state) / 2, getMainCard(state).position[1]]
  return moveMouse(state, x, y)
}

function moveMouseRightOfHand(state: GameState): GameState {
  const [x, y] = [HAND_POSITION[0] + handWidth(state) / 2, getMainCard(state).position[1]]
  return moveMouse(state, x, y)
}

const currentTime = 1337
const card = new Card(0, "some-card", "hand")
const card2 = new Card(1, "other-card", "hand")

export default function main() {
  const handWithCards = spec().when(addCardsToHand)
  const hovering = handWithCards.when(moveMouseToCard)

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

  // doesn't zoom in if mouse is outside hand width
  handWithCards
    .when(moveMouseLeftOfHand)
    .expect(scale)
    .toEqual(Card.DEFAULT_SCALE)

  handWithCards
    .when(moveMouseRightOfHand)
    .expect(otherCardScale)
    .toEqual(Card.DEFAULT_SCALE)
}
