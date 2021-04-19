import vsSource from './test.vert'
import fsSource from './test.frag'
import { cards, CardData } from '../cards'
import { Card } from '../game/card'

const IMAGE_WIDTH = 906/2
const IMAGE_HEIGHT = 1328/2
const IMAGE_MARGIN = 16/2
const TEXTURE_WIDTH = 2048/2
const TEXTURE_HEIGHT = 2048/2

const CARD_WIDTH = IMAGE_WIDTH - IMAGE_MARGIN
const CARD_HEIGHT = IMAGE_HEIGHT - IMAGE_MARGIN
console.log(CARD_WIDTH, CARD_HEIGHT)

export class CardSprite {
  card: Card
  gl: WebGLRenderingContext
  translationLocation: WebGLUniformLocation
  scaleLocation: WebGLUniformLocation
  rotationLocation: WebGLUniformLocation
  selectedLocation: WebGLUniformLocation
  selected: boolean = false
  program: WebGLProgram
  texture: WebGLTexture
  static images = new Map<string, HTMLImageElement>()

  constructor(gl: WebGLRenderingContext, card: Card) {
    this.card = card
    this.gl = gl

    const x1 = -CARD_WIDTH/2
    const x2 = CARD_WIDTH/2
    const y1 = -CARD_HEIGHT/2
    const y2 = CARD_HEIGHT/2

    const positions = [
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]    
    const image = CardSprite.images.get(card.name)
    if (!image) {
      throw new Error("No card image exists with name '" + card.name + "'")
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    const program = createProgram(gl, vs, fs)

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
    const translationLocation = gl.getUniformLocation(program, "u_translation")
    const scaleLocation = gl.getUniformLocation(program, "u_scale")
    const rotationLocation = gl.getUniformLocation(program, "u_rotation")
    const texCoordLocation = gl.getAttribLocation(program, "a_texcoord")
    const selectedLocation = gl.getUniformLocation(program, "u_selected")

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.useProgram(program)
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    const size = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    const x0 = IMAGE_MARGIN / TEXTURE_WIDTH
    const y0 = IMAGE_MARGIN / TEXTURE_HEIGHT
    const x = CARD_WIDTH / TEXTURE_WIDTH
    const y = CARD_HEIGHT / TEXTURE_HEIGHT
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x0,  y0,
        x,  y0,
        x0,  y,
        x0,  y,
        x,  y0,
        x,  y
    ]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

    // Create a texture.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
   
    // Set the parameters so we can render any size image.
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR)

    const ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
    )
    if (ext){
      const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      gl.texParameteri(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }
    gl.generateMipmap(gl.TEXTURE_2D)

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    if (
      !translationLocation ||
      !scaleLocation ||
      !rotationLocation ||
      !selectedLocation ||
      !texture
    ) {
      throw new Error("One or more shader locations are null")
    }
    this.program = program
    this.translationLocation = translationLocation
    this.scaleLocation = scaleLocation
    this.rotationLocation = rotationLocation
    this.selectedLocation = selectedLocation
    this.texture = texture
  }

  static prepareImages(): Promise<null> {
    return new Promise((resolve, reject) => {
      let loadedCardImages = 0;
      const cardsToLoad: CardData[] = [...cards, { id: -1, name: "space", emissions: 0 }]
      cardsToLoad.forEach((cardData: CardData) => {
        const image = new Image()
        image.src = `cards/${cardData.name}-pair.small.png`
        image.onload = () => {
          CardSprite.images.set(cardData.name, image)
          loadedCardImages++;
          if (loadedCardImages === cards.length) {
            resolve(null)
          }
        }
      })
    })
  }

  static render(sprite: CardSprite) {
    const gl = sprite.gl
    const translationLocation = sprite.translationLocation
    const scaleLocation = sprite.scaleLocation
    const rotationLocation = sprite.rotationLocation
    const selectedLocation = sprite.selectedLocation
    const program = sprite.program

    gl.useProgram(program)

    if (!translationLocation) {
      throw new Error("Could not find WebGL translation location")
    }
    gl.uniform2fv(translationLocation, sprite.card.position)
    gl.uniform1f(scaleLocation, sprite.card.scale)
    gl.uniform1f(rotationLocation, sprite.card.rotation + sprite.card.addedRotation)
    gl.uniform1i(selectedLocation, sprite.selected ? 1 : 0)
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}

export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {

  const shader = gl.createShader(type)

  if (!shader) throw new Error("Failed to create shader of type " + type)

  gl.shaderSource(shader, source)

  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    throw new Error("Could not compile shader:\n" + gl.getShaderInfoLog(shader))
  }

  return shader
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {

  const program = gl.createProgram()

  if (!program) throw new Error("Failed to create WebGL program")

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!success) {
    throw new Error("Could not create program:\n" + gl.getProgramInfoLog(program))
  }

  return program
}
