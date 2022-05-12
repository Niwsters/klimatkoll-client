import React from 'react'
import { TextConfig } from '@shared/models'
import { EventToAdd, createGameEvent } from '@shared/events'
import { PinkButton } from '@shared/components'

type AddEventFunc = (event: EventToAdd) => void

export function CreateGameBtn(
  text: TextConfig,
  addEvent: AddEventFunc,
  roomID: string
): React.ReactElement {
  function onClick() {
    addEvent(createGameEvent(roomID))
  }

  return PinkButton(text.btnCreateGame, onClick)
}
