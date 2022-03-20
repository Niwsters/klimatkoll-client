import { Subject } from 'rxjs'
import { Card } from '../game/card'
import { CardSprite } from './card-sprite'
import { EventToAdd, MouseMovedEvent, MouseClickedEvent } from '../event/event'
import { GameState } from '../game/gamestate'
import { CardData } from '../cards'

let cardSprites: CardSprite[] = []

function getCanvas(): HTMLCanvasElement {
  const canvas = document.getElementById('klimatkoll-canvas')
  if (!canvas)
    throw new Error("Can't find canvas element with ID klimatkoll-canvas")
  return canvas as HTMLCanvasElement
}

export class Canvas {
  gl: WebGLRenderingContext
  events$: Subject<EventToAdd> = new Subject<EventToAdd>()

  constructor() {
    const canvas = getCanvas()
    const gl = canvas.getContext("webgl")
    if (!gl) throw new Error("gl is null")
    this.gl = gl

    const ratio = window.devicePixelRatio; // Changes on browser/OS zoom
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerWidth * 0.5625 * ratio; // 540 / 960 = 0.5625
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const ratio = 960 / canvas.width * window.devicePixelRatio
      this.events$.next(new MouseMovedEvent(e.clientX * ratio, e.clientY * ratio))
    }, false)

    canvas.addEventListener('click', () => {
      this.events$.next(new MouseClickedEvent())
    }, false)

    window.addEventListener('resize', () => {
      const ratio = window.devicePixelRatio; // Changes on browser/OS zoom
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerWidth * 0.5625 * ratio; // 540 / 960 = 0.5625
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    }, false)

    if (!gl) {
      throw new Error("Failed to initialize WebGL")
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.gl = gl
  }

  prepare(baseUrl: string): void {
    fetch(`${baseUrl}/cards.json`)
      .then(response => response.json())
      .then((cards: CardData[]) => {
        cards = cards.map((c: CardData, i: number) => {
          return {
            ...c,
            id: i
          }
        })

        CardSprite.prepareTextures(this.gl, cards, baseUrl)
      })
  }

  render(state: GameState) {
    const gl = this.gl

    gl.clearColor(1, 1, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Map new cards to card sprites
    state.cards
      .forEach((card: Card) => {
        let sprite = cardSprites.find((s: CardSprite) => s.card.id === card.id)

        if (!sprite) {
          sprite = new CardSprite(gl, card)
          cardSprites.push(sprite)
        } else {
          // Update card data
          sprite.card = card
          const texture = CardSprite.textures.get(card.name)
          if (!texture) throw new Error("Could not find texture with name '" + card.name + "'")
          sprite.selected = state.selectedCardID === sprite.card.id
          sprite.texture = texture
        }
      })

    // Remove card sprites that don't exist in gamestate
    cardSprites
      .filter(s => state.cards.find(c => c.id === s.card.id) === undefined)
      .forEach((s: CardSprite) => {
        CardSprite.delete(s, gl)        
      })
    cardSprites = cardSprites
      .filter(s => state.cards.find(c => c.id === s.card.id))

    cardSprites
      .sort((a,b) => {
        if (a.card.zLevel < b.card.zLevel) return -1;
        if (a.card.zLevel > b.card.zLevel) return 1;
        return 0;
      })
      .forEach((sprite: CardSprite) => {
        CardSprite.render(sprite)
      })
  }
}
