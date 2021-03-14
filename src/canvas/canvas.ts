import { Card } from '../game/card'
import { CardSprite } from './card-sprite'
import { GameState } from '../game/gamestate'

const cardSprites: CardSprite[] = []

export function initCanvas(state: GameState) {
  const canvasID = 'klimatkoll-canvas'
  const canvas = document.getElementById(canvasID) as HTMLCanvasElement

  if (!canvas) {
    throw new Error("Can't find canvas element with ID: " + canvasID)
  }

  const gl: WebGLRenderingContext | null = canvas.getContext("webgl")

  if (!gl) {
    throw new Error("Failed to initialize WebGL")
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  CardSprite.prepareImages().then(() => {
    render(gl, state)
  })
}

export function render(gl: WebGLRenderingContext, state: GameState) {
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  state.cards.forEach((card: Card) => {
    const spriteExists = cardSprites.findIndex((s: CardSprite) => s.card.id === card.id) > -1

    if (!spriteExists) {
      cardSprites.push(new CardSprite(gl, card))
    }
  })
  cardSprites.forEach((sprite: CardSprite) => {
    CardSprite.render(sprite)
  })
}
