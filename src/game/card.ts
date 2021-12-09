import { ANIMATION_DURATION_MS } from './constants'

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
  flipped: boolean = false
  transpositions: TransposeGoal[] = []

  constructor(
    id: number,
    name: string,
    container: "hand" | "opponent-hand" | "emissions-line" | "deck"
  ) {
    this.id = id
    this.name = name
    if (name === "space") this.isSpace = true
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
    goal: TransposeGoal
  ): Card {

    return {
      ...card,
      transpositions: [...card.transpositions, goal]
    }
  }

  static update(
    card: Card,
    time: number
  ): Card {
    const newCard = { ...card }

    newCard.transpositions = newCard.transpositions.filter(t => time - t.timestamp < ANIMATION_DURATION_MS)

    card.transpositions.forEach((t: TransposeGoal) => {
      if (t.position !== undefined) {
        newCard.position = [
          transpose(card.position[0], t.position[0], time - t.timestamp),
          transpose(card.position[1], t.position[1], time - t.timestamp)
        ]
      }

      if (t.rotation !== undefined)
        newCard.rotation = transpose(card.rotation, t.rotation, time - t.timestamp)

      if (t.addedRotation !== undefined)
        newCard.addedRotation = transpose(card.addedRotation, t.addedRotation, time - t.timestamp)

      if (t.scale !== undefined)
        newCard.scale = transpose(card.scale, t.scale, time - t.timestamp)
    })

    return newCard
  }
}

export interface TransposeGoal {
  timestamp: number
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
  constructor(id: number) {
    super(id, "space", "emissions-line")
  }
}
