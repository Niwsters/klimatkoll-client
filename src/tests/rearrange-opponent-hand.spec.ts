import { Card, ICard } from '../game/card'
import { ANIMATION_DURATION_MS, HAND_CARD_ANGLE, HAND_X_RADIUS, HAND_Y_RADIUS, OPPONENT_HAND_POSITION } from '../game/constants'
import { Factory } from './test-factory'
import { spec } from './spec'
import { GameState } from '../game/gamestate'

function getOpponentHandCardPosition(i: number, cardCount: number): [number, number] {
  const n = cardCount - 1
  const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
  const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
  const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

  return [x, y]
}

function initCards(): [Card, Card] {
  const card = new Card(0, "blargh", "opponent-hand")
  const card2 = new Card(1, "1337", "opponent-hand")
  return [card, card2]
}

function moveCard(card: Card, position: [number, number], rotation: number): Card {
  card = card.move(position[0], position[1], currentTime)
  card = card.rotateGlobal(rotation, currentTime)
  return card.update(currentTime + ANIMATION_DURATION_MS)
}

function expectedCards() {
  let [card, card2] = initCards()

  card = moveCard(card, getOpponentHandCardPosition(0, 2), 2.9845130209103035)
  card2 = moveCard(card2, getOpponentHandCardPosition(1, 2), 3.2986722862692828)

  return [card, card2]
}

const currentTime = 1337

export default function main() {
  spec()
    .when(() => {
      const state = Factory.GameState()
      const [card, card2] = initCards()

      state.opponentHand = state.opponentHand.addCard(Card.fromICard(card))
      state.opponentHand = state.opponentHand.addCard(Card.fromICard(card2))

      return state
        .update(currentTime) // Queue animations
        .update(currentTime + ANIMATION_DURATION_MS) // Finish animations
    })
    .expect((state: GameState) => state.cards)
    .toEqual(expectedCards())
}
