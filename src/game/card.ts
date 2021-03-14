export class Card {
  id: number
  name: string
  container: string
  position: number[] = [0, 0]

  constructor(id: number, name: string, container: "hand" | "opponent-hand" | "emission-line") {
    this.id = id
    this.name = name
    this.container = container
  }
}
