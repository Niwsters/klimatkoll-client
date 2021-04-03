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

  constructor(id: number, name: string, container: "hand" | "opponent-hand" | "emission-line") {
    this.id = id
    this.name = name
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
}
