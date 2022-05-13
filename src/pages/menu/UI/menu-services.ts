import { EventToAdd } from '@shared/events'
import { TextConfig } from '@shared/models'
import { Inbox } from 'inbox'
import { AddEventFunc } from './add-event'

export type MenuServices = {
  addEvent: AddEventFunc
  httpServerURL: string
  text: TextConfig
  appWidth: number
  mpServer: Inbox<EventToAdd>
}
