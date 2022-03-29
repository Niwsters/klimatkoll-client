import { App, AppConfig } from './App';
import { TextConfig } from './models/text-config'
import { root, Root } from './root'
import { Overlay } from './Overlay'
import ReactDOM from 'react-dom';

function UIElem() {
  const uiElem = document.createElement('div')
  uiElem.id = "user-interface"
  return uiElem
}

function CanvasElem() {
  const canvasElem = document.createElement('canvas')
  canvasElem.id = "klimatkoll-canvas"
  return canvasElem
}

function AppElem(uiElem: HTMLElement, canvasElem: HTMLCanvasElement) {
  const appElem = document.createElement('div')
  appElem.id = "app"
  appElem.appendChild(Overlay(canvasElem, uiElem))
 
  return appElem
}

class BaseFontSize {
  readonly element: HTMLStyleElement
  constructor() {
    const element = document.createElement('style')
    element.innerText = "#app { font-size: 2.1vw; }"
    this.element = element
  }

  resize(appWidth: number) {
    this.element.innerText = `#app { font-size: ${0.021 * appWidth}px }`
  }
}

function renderUI(
  uiElem: HTMLElement,
  app: App,
) {
  ReactDOM.render(
    app.renderUI(),
    uiElem
  )
}

function desiredWidth(): number {
  if (window.innerHeight / window.innerWidth < 0.5625)
    return window.innerHeight * window.devicePixelRatio / 0.5625;

  return window.innerWidth * window.devicePixelRatio;
}

function desiredHeight(): number {
  return desiredWidth() * 0.5625
}

function createApp(root: Root, text: TextConfig, canvasElem: HTMLCanvasElement) {
  const config = new AppConfig(root.devMode, root.language, text);
  return new App(config, canvasElem, window.innerWidth * window.devicePixelRatio)
}

function renderApp(root: Root, text: TextConfig) {
  const uiElem = UIElem()
  const canvasElem = CanvasElem()
  root.element.appendChild(AppElem(uiElem, canvasElem))

  const baseFontSize = new BaseFontSize()
  root.element.appendChild(baseFontSize.element)
  const app = createApp(root, text, canvasElem)

  window.addEventListener('resize', () => {
    app.resize(desiredWidth(), desiredHeight())
    baseFontSize.resize(desiredWidth())
  }, false)

  renderUI(uiElem, app)
}

async function getTextConfig(root: Root): Promise<TextConfig> {
  const response: Response = await fetch(`${root.serverUrl}/${root.language}/text.json`)
  const textConfig: TextConfig = await response.json()
  return textConfig
}

async function start(root: Root) {
  const textConfig = await getTextConfig(root)
  renderApp(root, textConfig)
}

start(root())
