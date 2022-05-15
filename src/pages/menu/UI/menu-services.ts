import { EventToAdd } from '@shared/events'
import { AddEventFunc, TextConfig } from '@shared/models'
import { Inbox } from 'inbox'

export type MenuServices = {
  httpServerURL: string
  text: TextConfig
  appWidth: number
  mpServer: Inbox<EventToAdd>
  addEvent: AddEventFunc
}
