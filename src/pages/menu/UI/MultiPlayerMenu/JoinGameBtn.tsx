import React from 'react'
import { TextConfig } from '@shared/models'
import { EventToAdd, joinGameEvent } from '@shared/events'
import { YellowButton } from '@shared/components'

type AddEventFunc = (event: EventToAdd) => void

export function JoinGameBtn(
  text: TextConfig,
  addEvent: AddEventFunc,
  roomID: string
): React.ReactElement {
  function onClick() {
    addEvent(joinGameEvent(roomID))
  }

  return YellowButton(text.btnJoinGame, onClick)
}
