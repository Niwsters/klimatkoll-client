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
}

export class Card implements ICard {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.275

  readonly id: number
  readonly name: string
  readonly container: Container

  position: [number, number] = [0, 0]
  scale: number = Card.DEFAULT_SCALE
  rotation: number = 0
  addedRotation: number = 0

  zLevel: number = 0
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
    this.container = container
  }

  get isSpace(): boolean {
    return this.name === "space"
  }

  static fromICard(icard: ICard): Card {
    return Object.assign(new Card(icard.id, icard.name, icard.container), icard)
  }

  private new(): Card {
    return Object.assign(new Card(this.id, this.name, this.container), this)
  }

  move(x: number, y: number, currentTime: number): Card {
    let card = this.new()

    const existing = card.positionGoal
    if (existing.position[0] === x && existing.position[1] === y)
      return card

    card.positionGoal = {
      timestamp: currentTime,
      position: [x, y]
    }

    return card
  }

  static move(icard: ICard, x: number, y: number, currentTime: number): Card {
    return Card.fromICard(icard).move(x, y, currentTime)
  }

  rotateGlobal(rotation: number, currentTime: number): Card {
    let card = this.new()

    if (card.rotationGoal.rotation === rotation)
      return card

    card.rotationGoal = {
      timestamp: currentTime,
      rotation: rotation
    }
    
    return card
  }

  static rotateGlobal(icard: ICard, rotation: number, currentTime: number): Card {
    return Card.fromICard(icard).rotateGlobal(rotation, currentTime)
  }

  rotateLocal(rotation: number, currentTime: number): Card {
    let card = this.new()

    if (card.addedRotationGoal.addedRotation === rotation)
      return card

    card.addedRotationGoal = {
      timestamp: currentTime,
      addedRotation: rotation
    }

    return card
  }

  static rotateLocal(icard: ICard, rotation: number, currentTime: number): Card {
    return Card.fromICard(icard).rotateLocal(rotation, currentTime)
  }

  setScale(scale: number, currentTime: number): Card {
    let card = this.new()

    if (card.scaleGoal.scale === scale)
      return card

    card.scaleGoal = {
      timestamp: currentTime,
      scale: scale
    }

    return card
  }

  static scale(icard: ICard, scale: number, currentTime: number): Card {
    return Card.fromICard(icard).setScale(scale, currentTime)
  }

  private transposePosition(time: number): Card {
    let card = this.new()

    card.position = [
      transpose(
        card.position[0], card.positionGoal.position[0], time - card.positionGoal.timestamp
      ),
      transpose(
        card.position[1], card.positionGoal.position[1], time - card.positionGoal.timestamp
      )
    ]

    return card
  }

  update(time: number): Card {
    let card = this.new()

    card = card.transposePosition(time)
    card.scale = transpose(card.scale, card.scaleGoal.scale, time - card.scaleGoal.timestamp)
    card.rotation = transpose(
      card.rotation, card.rotationGoal.rotation, time - card.rotationGoal.timestamp
    )
    card.addedRotation = transpose(
      card.addedRotation, card.addedRotationGoal.addedRotation, time - card.addedRotationGoal.timestamp
    )

    return card
  }

  static update(
    icard: ICard,
    time: number
  ): Card {
    return Card.fromICard(icard).update(time)
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
