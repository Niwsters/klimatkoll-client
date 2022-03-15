import { Card } from '../game/card'
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

function getHandCardPosition(i: number, cardCount: number): number[] {
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

function expectedCards(): [Card, Card] {
  let [card, card2] = initialiseCards()
  const pos1 = getHandCardPosition(0, 2)
  const pos2 = getHandCardPosition(1, 2)
  card = Card.move(card, pos1[0], pos1[1], currentTime)
  card = Card.rotateGlobal(card, -0.15707963267948966, currentTime)
  card = Card.scale(card, 0.275, currentTime)
  card.zLevel = 10
  card = Card.update(card, currentTime + ANIMATION_DURATION_MS)

  card2 = Card.move(card2, pos2[0], pos2[1], currentTime)
  card2 = Card.rotateGlobal(card2, 0.15707963267948966, currentTime)
  card2 = Card.scale(card2, 0.275, currentTime)
  card2.zLevel = 11
  card2 = Card.update(card2, currentTime + ANIMATION_DURATION_MS)

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
