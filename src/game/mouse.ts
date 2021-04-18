import { vec2, mat2 } from 'gl-matrix'
import { Card } from '../game/card'

export class Mouse {
  static intersects(card: Card, original_mouse_position: vec2): boolean {
    // Copy values so that we don't overwrite them
    let mouse_position: vec2 = vec2.create()
    vec2.copy(mouse_position, original_mouse_position)
    let card_position = vec2.fromValues(card.position[0], card.position[1])

    // Get mouse coordinates relative to card rotation and position
    const origin = vec2.fromValues(0, 0)
    vec2.rotate(mouse_position, mouse_position, origin, -card.rotation)
    vec2.rotate(card_position, card_position, origin, -card.rotation)
    vec2.subtract(mouse_position, mouse_position, card_position)

    // Check if mouse is within card width and height
    const rect = Card.getRectangle(card)
    if (
      // within width
      mouse_position[0] > rect[0][0] && mouse_position[0] < rect[1][0] &&
      // within height
      mouse_position[1] > rect[0][1] && mouse_position[1] < rect[1][1]
    ) {
      return true
    }

    return false
  }
}
