import { Card, ICard } from '../game/card'
import {
  HAND_POSITION,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_CARD_ANGLE,
  ANIMATION_DURATION_MS,
} from '../game/constants'
import { Factory } from './test-factory'
import { spec } from './spec'
import { MouseMovedEvent } from '../event/event'

const currentTime = 1337

function getHandCardPosition(i: number, cardCount: number): [number, number] {
  const n = cardCount - 1
  let angle = HAND_CARD_ANGLE * (i - n/2)
  let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

function initialiseCards(): [Card, Card] {
  let card = new Card(0, "blargh", "hand")
  let card2 = new Card(1, "1337", "hand")
  return [card, card2]
}

function moveCard(card: Card, position: [number, number], rotation: number, scale: number, zLevel: number): Card {
  card = card.move(position[0], position[1], currentTime)
  card = card.rotateGlobal(rotation, currentTime)
  card = card.setScale(scale, currentTime)
  card.zLevel = zLevel 
  return card.update(currentTime + ANIMATION_DURATION_MS)
}

function expectedCards(): [ICard, ICard] {
  let [card, card2] = initialiseCards()

  card = moveCard(card, getHandCardPosition(0, 2), -0.15707963267948966, 0.275, 10)
  card2 = moveCard(card2, getHandCardPosition(1, 2), 0.15707963267948966, 0.275, 11)

  return [card, card2]
}

export default function main() {
  spec()
    .when(() => {
      const [card, card2] = initialiseCards()

      let state = Factory.GameState()
      state.hand = state.hand
        .addCard(card)
        .addCard(card2)
      state = state.mouse_moved({event_id: 0, ...new MouseMovedEvent(0, 0)})[0]

      return state.update(currentTime).update(currentTime + ANIMATION_DURATION_MS)
    })
    .expect(state => state.cards)
    .toEqual(expectedCards())
}
