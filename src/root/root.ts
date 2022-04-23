import { BaseFontSize } from "./base-font-size"
import { Frame, FrameElement } from "./frame"
import { Environment, getEnvironment } from './environment'
import { Stream, StreamSource } from '../stream'
import { Resolution, getResolution } from './resolution'
import { getTextConfig } from "../text-config"
import { TextConfig } from "@shared/models"

function getRootElem(): HTMLElement {
  const rootElem = document.getElementById('climate-call')
  if (!rootElem) throw new Error("Can't find element with id 'climate-call'")
  return rootElem
}

export type Root = {
  readonly environment: Environment
  readonly frame: FrameElement
  readonly resolution$: Stream<Resolution>
  readonly text: TextConfig
}

export async function mountRoot(): Promise<Root> {
  const element = getRootElem()

  const frame = Frame()
  element.appendChild(frame.element)

  const resolution$ = new StreamSource<Resolution>(getResolution(element))
  new ResizeObserver(() => resolution$.next(getResolution(element))).observe(element)

  const baseFontSize = new BaseFontSize(resolution$)
  element.appendChild(baseFontSize.element)

  const environment = getEnvironment(element)
  const text = await getTextConfig(environment)

  return {
    environment,
    resolution$,
    frame,
    text
  } as const
}
