import React from 'react'
import { TextConfig } from '../../../models/text-config'
import { EventToAdd, CreateGameEvent } from '../../../event/event'
import { PinkButton } from '@shared/components'

type AddEventFunc = (event: EventToAdd) => void

export function CreateGameBtn(
  text: TextConfig,
  addEvent: AddEventFunc,
  roomID: string
): React.ReactElement {
  function onClick() {
    addEvent(new CreateGameEvent(roomID))
  }

  return PinkButton(text.btnCreateGame, onClick)
}
