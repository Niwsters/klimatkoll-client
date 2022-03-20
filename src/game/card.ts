import { Position } from './position'
import { transpose } from './transpose'

export type ICard = {
  id: number
  name: string
  position: Position
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

  position: Position = new Position(0, 0)
  scale: number = Card.DEFAULT_SCALE
  rotation: number = 0
  addedRotation: number = 0

  zLevel: number = 0
  visible: boolean = true
  flipped: boolean = false

  private positionGoal: PositionGoal = {
    position: new Position(0, 0),
    timestamp: 0
  }
  private rotationGoal: TransposeGoal = new TransposeGoal(0, 0)
  private addedRotationGoal: TransposeGoal = new TransposeGoal(0, 0)
  private scaleGoal: TransposeGoal = new TransposeGoal(0, Card.DEFAULT_SCALE)

  constructor(
    id: number,
    name: string,
  ) {
    this.id = id
    this.name = name
  }

  get isSpace(): boolean {
    return this.name === "space"
  }

  private new(): Card {
    return Object.assign(new Card(this.id, this.name), this)
  }

  move(x: number, y: number, currentTime: number): Card {
    let card = this.new()

    const existing = card.positionGoal
    if (existing.position.x === x && existing.position.y === y)
      return card

    card.positionGoal = {
      timestamp: currentTime,
      position: new Position(x, y)
    }

    return card
  }

  rotateGlobal(rotation: number, currentTime: number): Card {
    let card = this.new()

    if (card.rotationGoal.goal === rotation)
      return card

    card.rotationGoal = new TransposeGoal(currentTime, rotation)
    
    return card
  }

  rotateLocal(rotation: number, currentTime: number): Card {
    let card = this.new()

    if (card.addedRotationGoal.goal === rotation)
      return card

    card.addedRotationGoal = new TransposeGoal(currentTime, rotation)

    return card
  }

  setScale(scale: number, currentTime: number): Card {
    let card = this.new()

    if (card.scaleGoal.goal === scale)
      return card

    card.scaleGoal = new TransposeGoal(currentTime, scale)

    return card
  }

  private transposePosition(time: number): Card {
    let card = this.new()

    card.position = new Position(
      transpose(
        card.position.x, card.positionGoal.position.x, time - card.positionGoal.timestamp
      ),
      transpose(
        card.position.y, card.positionGoal.position.y, time - card.positionGoal.timestamp
      )
    )

    return card
  }

  update(time: number): Card {
    let card = this.new()

    card = card.transposePosition(time)
    card.scale = transpose(card.scale, card.scaleGoal.goal, time - card.scaleGoal.timestamp)
    card.rotation = transpose(
      card.rotation, card.rotationGoal.goal, time - card.rotationGoal.timestamp
    )
    card.addedRotation = transpose(
      card.addedRotation, card.addedRotationGoal.goal, time - card.addedRotationGoal.timestamp
    )

    return card
  }
}

class TransposeGoal {
  timestamp: number
  goal: number

  constructor(timestamp: number, goal: number) {
    this.timestamp = timestamp
    this.goal = goal
  }
}

type PositionGoal = {
  timestamp: number,
  position: Position
}

export class SpaceCard extends Card {
  constructor(id: number) {
    super(id, "space")
  }
}
