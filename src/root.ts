function getRootElem() {
  const rootElem = document.getElementById('climate-call')
  if (!rootElem) throw new Error("Can't find element with id 'climate-call'")
  return rootElem
}

function isDevMode(): boolean {
  const devModeAttr = getRootElem().getAttribute('devmode')
  return devModeAttr !== undefined &&
         devModeAttr !== null ? true : false
}

function getLanguage() {
  return getRootElem().getAttribute('lang') || 'sv'
}

function getServerUrl(): string {
  return isDevMode() ? "http://localhost:3000" : "https://spela.kortspeletklimatkoll.se"
}

export type Root = {
  language: string,
  devMode: boolean,
  serverUrl: string,
  element: HTMLElement
}

export function root(): Root {
  return {
    language: getLanguage(),
    devMode: isDevMode(),
    serverUrl: getServerUrl(),
    element: getRootElem()
  } as const
}
