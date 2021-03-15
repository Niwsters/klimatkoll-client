export class Card {
  static DEFAULT_WIDTH = 445
  static DEFAULT_HEIGHT = 656
  static DEFAULT_SCALE = 0.35

  id: number
  name: string
  container: string
  position: number[] = [0, 0]
  scale: number = Card.DEFAULT_SCALE

  constructor(id: number, name: string, container: "hand" | "opponent-hand" | "emission-line") {
    this.id = id
    this.name = name
    this.container = container
  }
}
