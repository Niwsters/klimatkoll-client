import { GameState } from './gamestate'
import { Card, TransposeGoal } from './card'
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
    timePassed: number
  ): GameState {
    let i = 0
    const n = state.cards.filter(c => c.container == "hand").length - 1
    state.cards = state.cards.map((card: Card) => {
      if (card.container != "hand") return card

      let angle = HAND_CARD_ANGLE * (i - n/2)
      let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
      let scale = Card.DEFAULT_SCALE
      card.zLevel = i

      const focusedCardID = GameState.getFocusedCardID(state)
      if (focusedCardID == card.id) {
        y = HAND_POSITION[1] - 230
        scale = Card.DEFAULT_SCALE * 2
        angle = 0
        card.zLevel = 999
      }

      const goal: TransposeGoal = {
        position: [x,y],
        rotation: angle * HAND_ANGLE_FACTOR,
        scale: scale
      }
      i += 1
      return Card.transpose(card, goal, timePassed)
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
