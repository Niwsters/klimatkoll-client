import { Position } from './position'
import { TransitionGoal } from './transition-goal'

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
  selected: boolean
}

export class Card implements ICard {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.275

  readonly id: number
  name: string

  private x: number = 0
  private y: number = 0
  scale: number = Card.DEFAULT_SCALE
  rotation: number = 0
  addedRotation: number = 0

  zLevel: number = 0
  visible: boolean = true
  flipped: boolean = false
  selected: boolean = false
  isSpace: boolean = false

  private xGoal: TransitionGoal = new TransitionGoal(0, 0)
  private yGoal: TransitionGoal = new TransitionGoal(0, 0)
  private rotationGoal: TransitionGoal = new TransitionGoal(0, 0)
  private addedRotationGoal: TransitionGoal = new TransitionGoal(0, 0)
  private scaleGoal: TransitionGoal = new TransitionGoal(0, Card.DEFAULT_SCALE)

  constructor(
    id: number,
    name: string,
  ) {
    this.id = id
    this.name = name
  }

  get position(): Position {
    return new Position(this.x, this.y)
  }

  set position(position: Position) {
    this.x = position.x
    this.y = position.y
  }

  private new(): Card {
    return Object.assign(new Card(this.id, this.name), this)
  }

  select(): Card {
    const card = this.new()
    card.selected = true
    return card
  }

  deselect(): Card {
    const card = this.new()
    card.selected = false
    return card
  }

  move(x: number, y: number, currentTime: number): Card {
    let card = this.new()

    card.xGoal = card.xGoal.update(currentTime, x)
    card.yGoal = card.yGoal.update(currentTime, y)

    return card
  }

  rotateGlobal(rotation: number, currentTime: number): Card {
    let card = this.new()
    card.rotationGoal = card.rotationGoal.update(currentTime, rotation)
    return card
  }

  rotateLocal(rotation: number, currentTime: number): Card {
    let card = this.new()
    card.addedRotationGoal = card.addedRotationGoal.update(currentTime, rotation)
    return card
  }

  setScale(scale: number, currentTime: number): Card {
    let card = this.new()
    card.scaleGoal = card.scaleGoal.update(currentTime, scale)
    return card
  }

  update(time: number): Card {
    let card = this.new()

    card.y = card.yGoal.transpose(card.y, time)
    card.x = card.xGoal.transpose(card.x, time)
    card.scale = card.scaleGoal.transpose(card.scale, time)
    card.rotation = card.rotationGoal.transpose(card.rotation, time)
    card.addedRotation = card.addedRotationGoal.transpose(card.addedRotation, time)

    return card
  }

  hide(): Card {
    const card = this.new()
    card.visible = false
    return card
  }

  show(): Card {
    const card = this.new()
    card.visible = true
    return card
  }
}
