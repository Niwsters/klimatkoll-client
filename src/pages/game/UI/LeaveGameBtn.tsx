import React from 'react'
import { EventToAdd, leaveGameEvent } from '../../../event/event'
import { TextConfig } from '@shared/models'
import { PinkButton } from '@shared/components'

export function LeaveGameBtn(
  text: TextConfig,
  addEvent: (event: EventToAdd) => void
): React.ReactElement {
  function onClick() {
    addEvent(leaveGameEvent())
  }

  return PinkButton(text.btnLeaveGame, onClick)
}
