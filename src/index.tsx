import { App } from './app';
import { AppConfig } from './app-config'
import { TextConfig } from './models/text-config'
import { root, RootElement } from './root'

function createApp(
  root: RootElement,
  text: TextConfig,
  canvasElem: HTMLCanvasElement,
  uiElem: HTMLElement
) {
  const config = new AppConfig(root.environment.devMode, root.environment.language, text);
  const app = new App(config, canvasElem, uiElem, root)
}

function renderApp(root: RootElement, text: TextConfig) {
  createApp(root, text, root.frame.canvasElem, root.frame.uiElem)
}

async function getTextConfig(root: RootElement): Promise<TextConfig> {
  const response: Response = await fetch(`${root.environment.serverUrl}/${root.environment.language}/text.json`)
  const textConfig: TextConfig = await response.json()
  return textConfig
}

async function start(root: RootElement) {
  const textConfig = await getTextConfig(root)
  renderApp(root, textConfig)
}

start(root())
