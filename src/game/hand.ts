import { GameState } from './gamestate'
import { Card } from './card'
import {
  HAND_POSITION,
  OPPONENT_HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

export class Hand {
  static rearrange(
    state: GameState,
    hoveredCardID: number | null = null
  ): GameState {
    let i = 0
    const n = state.cards.filter(c => c.container == "hand").length - 1
    state.cards = state.cards.map((card: Card) => {
      if (card.container != "hand") return card

      let angle = HAND_CARD_ANGLE * (i - n/2)
      let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

      if (hoveredCardID == card.id) {
        y = HAND_POSITION[1] - 130
      }

      card.position = [x,y]
      card.rotation = angle * HAND_ANGLE_FACTOR
      i += 1
      return card
    })

    return state
  }
}

export class OpponentHand {
  static rearrange(
    state: GameState
  ): GameState {
    let i = 0
    const n = state.cards.filter(c => c.container == "opponent-hand").length - 1
    state.cards = state.cards.map((card: Card) => {
      if (card.container != "opponent-hand") return card

      const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
      const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
      card.position = [x,y]
      card.rotation = (angle + Math.PI) * HAND_ANGLE_FACTOR
      i += 1
      return card
    })

    return state
  }
}
