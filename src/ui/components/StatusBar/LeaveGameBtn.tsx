import React from 'react'
import { EventToAdd, LeaveGameEvent } from '../../../event/event'
import { TextConfig } from '../../../models/text-config'
import { PinkButton } from '../Button'

export function LeaveGameBtn(
  text: TextConfig,
  addEvent: (event: EventToAdd) => void
): React.ReactElement {
  function onClick() {
    addEvent(new LeaveGameEvent())
  }

  return PinkButton(text.btnLeaveGame, onClick)
}
