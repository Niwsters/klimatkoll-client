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

function BaseFontSize() {
  const baseFontSize = document.createElement('style')
  baseFontSize.innerText = "#app { font-size: 2.1vw; }"
  return baseFontSize
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

function createApp(root: Root, text: TextConfig, canvasElem: HTMLCanvasElement) {
  const config = new AppConfig(root.devMode, root.language, text);
  return new App(config, canvasElem)
}

function renderApp(root: Root, text: TextConfig) {
  const uiElem = UIElem()
  const canvasElem = CanvasElem()
  root.element.appendChild(AppElem(uiElem, canvasElem))
  root.element.appendChild(BaseFontSize())
  const app = createApp(root, text, canvasElem)

  window.addEventListener('resize', () => {
    const ratio = window.devicePixelRatio; // Changes on browser/OS zoom
    const width = window.innerWidth * ratio;
    const height = window.innerWidth * 0.5625 * ratio; // 540 / 960 = 0.5625
    app.resize(width, height)
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
