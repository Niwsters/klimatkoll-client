import { TextConfig } from '@shared/models'
import { AddEventFunc } from './add-event'

export type MenuServices = {
  addEvent: AddEventFunc
  httpServerURL: string
  text: TextConfig
  appWidth: number
}
