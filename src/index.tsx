import ReactDOM from 'react-dom';
import { App, AppConfig } from './App';
import { TextConfig } from './models/text-config'

const rootElem = document.getElementById('climate-call')
if (!rootElem) throw new Error("Can't find element with id 'climate-call'")

const lang = rootElem.getAttribute('lang') || 'sv'
const devModeAttr = rootElem.getAttribute('devmode')
const devMode =
  devModeAttr !== undefined &&
  devModeAttr !== null ? true : false

const url = devMode ? "http://localhost:3000" : "https://spela.kortspeletklimatkoll.se"

function UIElem() {
  const uiElem = document.createElement('div')
  uiElem.id = "app-inner"
  uiElem.style.display = "block"
  uiElem.style.height = "100%"
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

function initContainer() {
  const root = document.getElementById('climate-call')
  if (!root) throw new Error("Can't find element with ID climate-call")

  const uiElem = UIElem()
  root.appendChild(AppElem(uiElem))
  return uiElem
}

function renderApp(text: TextConfig) {
  const config = new AppConfig(devMode, lang, text);

  const uiElem = initContainer()

  const app = new App(config)

  ReactDOM.render(
    app.render(),
    uiElem
  )
}

async function getTextConfig(): Promise<TextConfig> {
  const response: Response = await fetch(`${url}/${lang}/text.json`)
  const textConfig: TextConfig = await response.json()
  return textConfig
}

async function start() {
  const textConfig = await getTextConfig()
  renderApp(textConfig)
}

start()
