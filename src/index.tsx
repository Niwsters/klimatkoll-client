import React from 'react';
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

function AppInnerElem() {
  const appInnerElem = document.createElement('div')
  appInnerElem.id = "app-inner"
  appInnerElem.style.display = "block"
  appInnerElem.style.height = "100%"
  return appInnerElem
}

function CanvasElem() {
  const canvasElem = document.createElement('canvas')
  canvasElem.id = "klimatkoll-canvas"
  return canvasElem
}

function AppElem(appInnerElem: HTMLElement) {
  const appElem = document.createElement('div')
  appElem.id = "app"

  appElem.appendChild(appInnerElem)
  appElem.appendChild(CanvasElem())

  return appElem
}

function initContainer() {
  const root = document.getElementById('climate-call')
  if (!root) throw new Error("Can't find element with ID climate-call")

  const appInnerElem = AppInnerElem()
  root.appendChild(AppElem(appInnerElem))
  return appInnerElem
}

function renderApp(text: TextConfig) {
  const config = new AppConfig(devMode, lang, text);

  const appInnerElem = initContainer()

  const app = new App(config)

  ReactDOM.render(
    app.render(),
    appInnerElem
  )
}

async function start() {
  const response: Response = await fetch(`${url}/${lang}/text.json`)
  const textConfig: TextConfig = await response.json()
  renderApp(textConfig)
}

start()
