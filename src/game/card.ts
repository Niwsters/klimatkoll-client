import { ANIMATION_DURATION_MS } from './constants'
import { GameState } from './gamestate'

export class Card {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.275

  id: number
  name: string
  container: string
  position: number[] = [0, 0]
  scale: number = Card.DEFAULT_SCALE
  rotation: number = 0
  addedRotation: number = 0
  zLevel: number = 0
  isSpace: boolean = false
  visible: boolean = true

  constructor(id: number, name: string, container: "hand" | "opponent-hand" | "emissions-line") {
    this.id = id
    this.name = name
    if (name == "space") this.isSpace = true
    this.container = container
  }

  static getRectangle(card: Card): number[][] {
    const width = Card.DEFAULT_WIDTH*card.scale
    const height = Card.DEFAULT_HEIGHT*card.scale

    return [
      [-width/2, -height/2],
      [width/2, height/2]
    ]
  }

  static transpose(
    card: Card,
    goal: TransposeGoal,
    timePassed: number
  ): Card {
    const newCard = { ...card }

    if (goal.position != undefined) {
      newCard.position = [
        transpose(card.position[0], goal.position[0], timePassed),
        transpose(card.position[1], goal.position[1], timePassed)
      ]
    }

    if (goal.rotation != undefined) {
      newCard.rotation = transpose(card.rotation, goal.rotation, timePassed)
    }

    if (goal.addedRotation != undefined) {
      newCard.addedRotation = transpose(card.addedRotation, goal.addedRotation, timePassed)
    }
    
    if (goal.scale != undefined) {
      newCard.scale = transpose(card.scale, goal.scale, timePassed)
    }

    return newCard
  }
}

export interface TransposeGoal {
  position?: number[]
  rotation?: number
  addedRotation?: number
  scale?: number
}

export function transpose(from: number, to: number, timePassed: number) {
  if (timePassed > ANIMATION_DURATION_MS) return to

  const fraction = timePassed/ANIMATION_DURATION_MS
  const mult = 1 - (1 - fraction) ** 2 // easeOutQuad easing function
  return from + (to - from)*mult
}

export class SpaceCard extends Card {
  constructor(state: GameState) {
    const spaceCardCount = state.cards.filter(c => c.name === "space").length
    super(-1 - spaceCardCount, "space", "emissions-line")
  }
}
