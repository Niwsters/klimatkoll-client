import React from 'react'
import { TextConfig } from '@shared/models'
import { EventToAdd, CreateGameEvent } from '@shared/events'
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
