export class Position extends Array {
  constructor(x: number, y: number) {
    super(2)
    this[0] = x
    this[1] = y
  }
}
