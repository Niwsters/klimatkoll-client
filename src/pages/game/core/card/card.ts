import { Position } from '../position'
import { ICard } from '@shared/models'
import { Entity } from './entity'

export class Card extends Entity implements ICard {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.275

  readonly id: number
  readonly name: string

  zLevel: number = 0
  visible: boolean = true
  flipped: boolean = false
  selected: boolean = false
  isSpace: boolean = false

  constructor(
    id: number,
    name: string,
    position: Position = new Position(0, 0),
    rotation: number = 0,
    addedRotation: number = 0,
    scale: number = Card.DEFAULT_SCALE
  ) {
    super(position, rotation, addedRotation, scale)
    this.id = id
    this.name = name
  }

  protected new(): Card {
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
