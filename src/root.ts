function getRootElem(): HTMLElement {
  const rootElem = document.getElementById('climate-call')
  if (!rootElem) throw new Error("Can't find element with id 'climate-call'")
  return rootElem
}

function isDevMode(): boolean {
  const devModeAttr = getRootElem().getAttribute('devmode')
  return devModeAttr !== undefined &&
         devModeAttr !== null ? true : false
}

function getLanguage(): string {
  return getRootElem().getAttribute('lang') || 'sv'
}

function getServerUrl(): string {
  return isDevMode() ? "http://localhost:3000" : "https://spela.kortspeletklimatkoll.se"
}

export type Root = {
  readonly language: string,
  readonly devMode: boolean,
  readonly serverUrl: string,
  readonly element: HTMLElement
}

export function root(): Root {
  return {
    language: getLanguage(),
    devMode: isDevMode(),
    serverUrl: getServerUrl(),
    element: getRootElem()
  } as const
}
