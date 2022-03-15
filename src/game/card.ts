import { ANIMATION_DURATION_MS } from './constants'

type Container = "hand" | "opponent-hand" | "emissions-line" | "deck"

export type ICard = {
  id: number
  name: string
  container: Container 
  position: [number, number]
  scale: number
  rotation: number
  addedRotation: number
  zLevel: number
  isSpace: boolean
  visible: boolean
  flipped: boolean
  positionGoal: PositionGoal
  rotationGoal: RotationGoal
  addedRotationGoal: AddedRotationGoal
  scaleGoal: ScaleGoal
}

export class Card implements ICard {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.275

  id: number
  name: string
  container: Container
  position: [number, number] = [0, 0]
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
    container: Container
  ) {
    this.id = id
    this.name = name
    if (name === "space") this.isSpace = true
    this.container = container
  }

  static move(card: ICard, x: number, y: number, currentTime: number): ICard {
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

  static rotateGlobal(card: ICard, rotation: number, currentTime: number): ICard {
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

  static rotateLocal(card: ICard, rotation: number, currentTime: number): ICard {
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

  static scale(card: ICard, scale: number, currentTime: number): ICard {
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

  private static transposePosition(card: ICard, time: number): ICard {
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
    oldCard: ICard,
    time: number
  ): ICard {
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
