import { Button } from '@shared/components'
import React from 'react'
import { ButtonLayout } from '../ButtonLayout'
import { SetRoute } from '../set-route'

type Props = {
  setRoute: SetRoute
  appWidth: number
}

export function SinglePlayerMenu(props: Props): React.ReactElement {
  const { setRoute, appWidth } = props

  return (
    <ButtonLayout appWidth={appWidth}>
      <Button color="yellow" label="WORK IN PROGRESS" onClick={() => {}}/>
      <Button color="pink" label="Tillbaka" onClick={() => setRoute("/")}/>
    </ButtonLayout>
  )
}
