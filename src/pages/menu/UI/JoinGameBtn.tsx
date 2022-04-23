import React from 'react'
import { TextConfig } from '../../../models/text-config'
import { EventToAdd, JoinGameEvent } from '../../../event/event'
import { YellowButton } from '@shared/components'

type AddEventFunc = (event: EventToAdd) => void

export function JoinGameBtn(
  text: TextConfig,
  addEvent: AddEventFunc,
  roomID: string
): React.ReactElement {
  function onClick() {
    addEvent(new JoinGameEvent(roomID))
  }

  return YellowButton(text.btnJoinGame, onClick)
}
