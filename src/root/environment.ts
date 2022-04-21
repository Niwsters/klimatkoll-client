function isDevMode(rootElement: HTMLElement): boolean {
  const devModeAttr = rootElement.getAttribute('devmode')
  return devModeAttr !== undefined &&
         devModeAttr !== null ? true : false
}

function getLanguage(rootElement: HTMLElement): string {
  return rootElement.getAttribute('lang') || 'sv'
}

function getServerUrl(rootElement: HTMLElement): string {
  return isDevMode(rootElement) ? "http://localhost:3000" : "https://spela.kortspeletklimatkoll.se"
}

export type Environment = {
  readonly language: string
  readonly devMode: boolean,
  readonly serverUrl: string
}

export function getEnvironment(rootElement: HTMLElement): Environment {
  return {
    language: getLanguage(rootElement),
    devMode: isDevMode(rootElement),
    serverUrl: getServerUrl(rootElement)
  } as const
}
