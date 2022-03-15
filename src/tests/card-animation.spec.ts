import { Card, ICard } from '../game/card'
import { ANIMATION_DURATION_MS } from '../game/constants'
import { spec } from './spec'

export default function main() {
  const test = spec().when(() => new Card(3, "blargh", "hand"))

  test
    .when((card: Card) => card = card.move(1337, 1337, 0))
    .when((card: Card) => Card.update(card, ANIMATION_DURATION_MS))
    .expect((card: ICard) => card.position).toEqual([1337, 1337])

  test
    .when(card => card = Card.rotateGlobal(card, 1337, 0))
    .when(card => Card.update(card, ANIMATION_DURATION_MS))
    .expect(card => card.rotation).toEqual(1337)

  test
    .when(card => Card.rotateLocal(card, 1337, 0))
    .when(card => Card.update(card, ANIMATION_DURATION_MS))
    .expect(card => card.addedRotation).toEqual(1337)

  test
    .when(card => Card.scale(card, 1337, 0))
    .when(card => Card.update(card, ANIMATION_DURATION_MS))
    .expect(card => card.scale).toEqual(1337)
}
