import { Button } from '@shared/components'
import { singlePlayerStartedEvent } from '@shared/events'
import { AddEventFunc } from '@shared/models'
import React from 'react'
import { ButtonLayout } from '../ButtonLayout'
import { SetRoute } from '../set-route'

type Props = {
  setRoute: SetRoute
  appWidth: number
  addEvent: AddEventFunc
}

export function SinglePlayerMenu(props: Props): React.ReactElement {
  const { setRoute, appWidth, addEvent } = props

  return (
    <ButtonLayout appWidth={appWidth}>
      <Button
        color="yellow"
        label="Spela"
        onClick={() => addEvent(singlePlayerStartedEvent())}
      />
      <Button color="pink" label="Tillbaka" onClick={() => setRoute("/")}/>
    </ButtonLayout>
  )
}
