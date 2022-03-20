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
  private rotationGoal: RotationGoal = {
    rotation: 0,
    timestamp: 0
  }
  private addedRotationGoal: AddedRotationGoal = {
    addedRotation: 0,
    timestamp: 0
  }
  private scaleGoal: ScaleGoal = new ScaleGoal(0, Card.DEFAULT_SCALE)

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

  static fromICard(icard: ICard): Card {
    return Object.assign(new Card(icard.id, icard.name), icard)
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

    card.scaleGoal = new ScaleGoal(currentTime, scale)

    return card
  }

  static scale(icard: ICard, scale: number, currentTime: number): Card {
    return Card.fromICard(icard).setScale(scale, currentTime)
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

class TransposeGoal {
  timestamp!: number
}

type PositionGoal = TransposeGoal & {
  position: Position
}

class ScaleGoal extends TransposeGoal {
  scale!: number

  constructor(timestamp: number, scale: number) {
    super()
    this.timestamp = timestamp
    this.scale = scale
  }
}

type RotationGoal = TransposeGoal & {
  rotation: number
}

type AddedRotationGoal = TransposeGoal & {
  addedRotation: number
}

export class SpaceCard extends Card {
  constructor(id: number) {
    super(id, "space")
  }
}
