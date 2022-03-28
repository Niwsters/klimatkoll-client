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

function AppElem(uiElem: HTMLElement) {
  const appElem = document.createElement('div')
  appElem.id = "app"

  appElem.appendChild(uiElem)
  appElem.appendChild(CanvasElem())

  return appElem
}

function initContainer(root: Root, uiElem: HTMLElement) {
  root.element.appendChild(AppElem(uiElem))
}

function renderApp(root: Root, text: TextConfig) {
  const uiElem = UIElem()
  initContainer(root, uiElem)
  renderUI(uiElem, text, root)
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
