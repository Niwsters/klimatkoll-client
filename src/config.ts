import { TextConfig } from './models/text-config'

export class AppConfig {
  devMode: boolean
  language: string
  text: TextConfig

  get baseURL(): string {
    if (this.devMode === true)
      return "localhost:3000"

    return "spela.kortspeletklimatkoll.se"
  }

  get httpServerURL(): string {
    if (this.devMode === true) {
      return `http://${this.baseURL}`
    }

    return `https://${this.baseURL}`
  }

  get wsServerURL(): string {
    if (this.devMode === true) {
      return `ws://${this.baseURL}`
    }

    return `wss://${this.baseURL}`
  }

  constructor(devMode: boolean, language: string, text: TextConfig) {
    this.devMode = devMode
    this.language = language
    this.text = text
  }
}
