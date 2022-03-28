import { renderUI } from './App';
import { TextConfig } from './models/text-config'
import { root, Root } from './root'

function UIElem() {
  const uiElem = document.createElement('div')
  uiElem.id = "app-inner"
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

  appElem.appendChild(uiElem)
  appElem.appendChild(canvasElem)

  return appElem
}

function renderApp(root: Root, text: TextConfig) {
  const uiElem = UIElem()
  const canvasElem = CanvasElem()
  root.element.appendChild(AppElem(uiElem, canvasElem))
  renderUI(uiElem, text, root.devMode, root.language, canvasElem)
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
