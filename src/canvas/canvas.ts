import { Card } from '../game/card'
import { CardSprite } from './card-sprite'
import { GameState } from '../game/gamestate'
import { Observable } from 'rxjs'

const cardSprites: CardSprite[] = []

/*
  window.onload = () => {
    const canvas = new Canvas(events$)

    canvas.prepare().then(() => {

    })
  }

  let i = 0
  window.onmousemove = (e: MouseEvent) => {
    const events = [
      ...events$.value,
      {
        event_id: 999 + i,
        event_type: "mouse_moved",
        payload: {
          x: e.clientX,
          y: e.clientY
        }
      }
    ]
    events$.next(events)
  }
  */

export class Canvas {
  gl: WebGLRenderingContext

  constructor() {
    const canvasID = 'klimatkoll-canvas'
    const canvas = document.getElementById(canvasID) as HTMLCanvasElement

    if (!canvas) {
      throw new Error("Can't find canvas element with ID: " + canvasID)
    }

    const gl = canvas.getContext("webgl")

    if (!gl) {
      throw new Error("Failed to initialize WebGL")
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.gl = gl
  }

  static prepare() {
    return CardSprite.prepareImages()
  }

  render(state: GameState) {
    const gl = this.gl

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Map new cards to card sprites
    // TODO: Remove unused card sprites
    state.cards.forEach((card: Card) => {
      let sprite = cardSprites.find((s: CardSprite) => s.card.id === card.id)

      if (!sprite) {
        sprite = new CardSprite(gl, card)
        cardSprites.push(sprite)
      } else {
        // Update card data
        sprite.card = card
      }
    })

    cardSprites.forEach((sprite: CardSprite) => {
      CardSprite.render(sprite)
    })   
  }
}
