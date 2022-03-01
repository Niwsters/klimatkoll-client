import { ANIMATION_DURATION_MS } from './constants'
import { vec2 } from 'gl-matrix'

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

  static move(card: Card, x: number, y: number, currentTime: number) {
    const existing = card.transpositions.find(t => t.position && t.position[0] === x && t.position[1] === y)
    if (existing)
      return {...card}

    return Card.transpose(card, {
      timestamp: currentTime,
      position: [x, y] 
    })
  }

  static rotateGlobal(card: Card, rotation: number, currentTime: number) {
    const existing = card.transpositions.find(t => t.rotation && t.rotation === rotation)
    if (existing)
      return {...card}

    return Card.transpose(card, {
      timestamp: currentTime,
      rotation: rotation
    })
  }

  static rotateLocal(card: Card, rotation: number, currentTime: number) {
    const existing = card.transpositions.find(t => t.addedRotation && t.addedRotation === rotation)
    if (existing)
      return {...card}

    return Card.transpose(card, {
      timestamp: currentTime,
      addedRotation: rotation
    })
  }

  static scale(card: Card, scale: number, currentTime: number) {
    const existing = card.transpositions.find(t => t.scale && t.scale === scale)
    if (existing)
      return {...card}

    return Card.transpose(card, {
      timestamp: currentTime,
      scale: scale
    })
  }

  static update(
    card: Card,
    time: number
  ): Card {
    const newCard = { ...card }

    newCard.transpositions.forEach((t: TransposeGoal) => {
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

    newCard.transpositions = newCard.transpositions.filter(t => time - t.timestamp < ANIMATION_DURATION_MS)

    return newCard
  }

  static isMouseHovering(card: Card, mouseX: number, mouseY: number): boolean {
    let mouse_position: vec2 = vec2.fromValues(mouseX, mouseY)
    let card_position = vec2.fromValues(card.position[0], card.position[1])

    // Get mouse coordinates relative to card rotation and position
    const origin = vec2.fromValues(0, 0)
    vec2.rotate(mouse_position, mouse_position, origin, -card.rotation)
    vec2.rotate(card_position, card_position, origin, -card.rotation)
    vec2.subtract(mouse_position, mouse_position, card_position)

    // Check if mouse is within card width and height
    const rect = Card.getRectangle(card)
    if (
      // within width
      mouse_position[0] > rect[0][0] && mouse_position[0] < rect[1][0] &&
      // within height
      mouse_position[1] > rect[0][1] && mouse_position[1] < rect[1][1]
    ) {
      return true
    }

    return false
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
