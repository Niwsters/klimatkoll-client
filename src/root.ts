import { BaseFontSize } from "./base-font-size"
import { desiredHeight, desiredWidth } from "./desired-resolution"
import { Frame, FrameElement } from "./frame"
import { Environment, getEnvironment } from './environment'

function getRootElem(): HTMLElement {
  const rootElem = document.getElementById('climate-call')
  if (!rootElem) throw new Error("Can't find element with id 'climate-call'")
  return rootElem
}

type Listener<T> = (value: T) => void

interface Stream<T> {
  subscribe(listener: Listener<T>): void
}

class StreamSource<T> implements Stream<T> {
  private value: T 
  private listeners: Listener<T>[] = []

  constructor(initialValue: T) {
    this.value = initialValue
  }

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener)
    listener(this.value)
  }

  next(value: T) {
    this.value = value
    for (const listener of this.listeners) {
      listener(this.value)
    }
  }
}

export type Resolution = {
  width: number,
  height: number
}

function getResolution(rootElement: HTMLElement): Resolution {
  return { width: desiredWidth(rootElement), height: desiredHeight(rootElement) }
}

export type RootElement = {
  readonly environment: Environment
  readonly element: HTMLElement,
  readonly frame: FrameElement,
  readonly getDesiredWidth: () => number,
  readonly getDesiredHeight: () => number
  readonly resolution$: Stream<Resolution>
}

export function root(): RootElement {
  const element = getRootElem()

  const frame = Frame()
  element.appendChild(frame.element)

  const resolution$ = new StreamSource<Resolution>(getResolution(element))
  new ResizeObserver(() => resolution$.next(getResolution(element))).observe(element)

  const getDesiredWidth = () => {
    return desiredWidth(element);
  }

  const getDesiredHeight = () => {
    return desiredHeight(element);
  }

  const baseFontSize = new BaseFontSize(getDesiredWidth)
  element.appendChild(baseFontSize.element)

  return {
    environment: getEnvironment(element),
    element,
    getDesiredWidth,
    getDesiredHeight,
    resolution$,
    frame
  } as const
}
