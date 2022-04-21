import { desiredWidth } from "./desired-resolution"
import { Root } from "./root"

export class BaseFontSize {
  readonly element: HTMLStyleElement

  constructor(root: Root) {
    const element = document.createElement('style')
    element.innerText = "#app { font-size: 2.1vw; }"
    this.element = element


    window.addEventListener('resize', () => {
      this.resize(desiredWidth(root))
    }, false)
  }

  resize(appWidth: number) {
    this.element.innerText = `#app { font-size: ${0.021 * appWidth}px }`
  }
}
