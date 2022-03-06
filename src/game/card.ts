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

  positionGoal: PositionGoal = {
    position: [0, 0],
    timestamp: 0
  }
  rotationGoal: RotationGoal = {
    rotation: 0,
    timestamp: 0
  }
  addedRotationGoal: AddedRotationGoal = {
    addedRotation: 0,
    timestamp: 0
  }
  scaleGoal: ScaleGoal = {
    scale: Card.DEFAULT_SCALE,
    timestamp: 0
  }

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

  static move(card: Card, x: number, y: number, currentTime: number): Card {
    const existing = card.positionGoal
    if (existing.position[0] === x && existing.position[1] === y)
      return {...card}

    return {
      ...card,
      positionGoal: {
        timestamp: currentTime,
        position: [x, y]
      }
    }
  }

  static rotateGlobal(card: Card, rotation: number, currentTime: number): Card {
    if (card.rotationGoal.rotation === rotation)
      return {...card}

    return {
      ...card,
      rotationGoal: {
        timestamp: currentTime,
        rotation: rotation
      }
    }
  }

  static rotateLocal(card: Card, rotation: number, currentTime: number): Card {
    if (card.addedRotationGoal.addedRotation === rotation)
      return {...card}

    return {
      ...card,
      addedRotationGoal: {
        timestamp: currentTime,
        addedRotation: rotation
      }
    }
  }

  static scale(card: Card, scale: number, currentTime: number): Card {
    if (card.scaleGoal.scale === scale)
      return {...card}

    return {
      ...card,
      scaleGoal: {
        timestamp: currentTime,
        scale: scale
      }
    }
  }

  private static transposePosition(card: Card, time: number): Card {
    return {
      ...card,
      position: [
        transpose(
          card.position[0], card.positionGoal.position[0], time - card.positionGoal.timestamp
        ),
        transpose(
          card.position[1], card.positionGoal.position[1], time - card.positionGoal.timestamp
        )
      ]
    }
  }

  static update(
    oldCard: Card,
    time: number
  ): Card {
    let card = { ...oldCard }

    card = Card.transposePosition(card, time)
    card.scale = transpose(card.scale, card.scaleGoal.scale, time - card.scaleGoal.timestamp)
    card.rotation = transpose(
      card.rotation, card.rotationGoal.rotation, time - card.rotationGoal.timestamp
    )
    card.addedRotation = transpose(
      card.addedRotation, card.addedRotationGoal.addedRotation, time - card.addedRotationGoal.timestamp
    )

    return card
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

export type TransposeGoal = {
  timestamp: number
}

type PositionGoal = TransposeGoal & {
  position: [number, number]
}

type ScaleGoal = TransposeGoal & {
  scale: number
}

type RotationGoal = TransposeGoal & {
  rotation: number
}

type AddedRotationGoal = TransposeGoal & {
  addedRotation: number
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
