import { App } from './app';
import { AppConfig } from './app-config'
import { TextConfig } from './models/text-config'
import { desiredWidth, desiredHeight } from './desired-resolution'
import { root, Root } from './root'
import { Overlay } from './overlay'
import { BaseFontSize } from './base-font-size';

function UIElem() {
  const uiElem = document.createElement('div')
  return uiElem
}

function CanvasElem() {
  const canvasElem = document.createElement('canvas')
  canvasElem.style.display = "block" // Fixes bottom margin issue with HTML Canvas element
  return canvasElem
}

function AppElem(uiElem: HTMLElement, canvasElem: HTMLCanvasElement) {
  const appElem = document.createElement('div')
  appElem.id = "app"
  appElem.style.width = "100%"
  appElem.style.height = "100%"
  appElem.appendChild(
    Overlay(
      canvasElem,
      uiElem
    )
  )
 
  return appElem
}

function createApp(
  root: Root,
  text: TextConfig,
  canvasElem: HTMLCanvasElement,
  uiElem: HTMLElement
) {
  const config = new AppConfig(root.devMode, root.language, text);
  const app = new App(config, canvasElem, uiElem, desiredWidth(root))
}

function renderApp(root: Root, text: TextConfig) {
  const uiElem = UIElem()
  const canvasElem = CanvasElem()
  root.element.appendChild(AppElem(uiElem, canvasElem))

  const baseFontSize = new BaseFontSize(root)
  root.element.appendChild(baseFontSize.element)
  createApp(root, text, canvasElem, uiElem)
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
