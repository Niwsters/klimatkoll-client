import { GameState } from './gamestate'
import { Card } from './card'
import {
  OPPONENT_HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

export class OpponentHand {
  static rearrange(
    state: GameState,
    currentTime: number = Date.now()
  ): GameState {
    let i = 0
    const n = state.cards.filter(c => c.container === "opponent-hand").length - 1
    state.cards = state.cards.map((card: Card) => {
      if (card.container !== "opponent-hand") return card

      const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
      const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, (angle + Math.PI) * HAND_ANGLE_FACTOR, currentTime)

      i += 1

      return card
    })

    return state
  }
}
