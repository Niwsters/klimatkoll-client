import { Environment } from './environment'

export class AppConfig {
  private readonly devMode: boolean
  private readonly language: string

  private get baseURL(): string {
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

  constructor(environment: Environment) {
    this.devMode = environment.devMode
    this.language = environment.language
  }
}
